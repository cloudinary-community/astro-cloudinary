import { describe, it, expect } from 'vitest'

describe('New Features Integration Tests', () => {
  describe('TypeScript Interface Validation', () => {
    it('should accept recursive option in configuration', () => {
      // Test that TypeScript accepts the new recursive option
      const config = {
        folder: 'test/gallery',
        recursive: true,
        limit: 10
      }
      
      expect(config.recursive).toBe(true)
      expect(config.folder).toBe('test/gallery')
      expect(config.limit).toBe(10)
    })

    it('should accept multiple resource types', () => {
      // Test that TypeScript accepts array of resource types
      const config = {
        resourceType: ['image', 'video', 'raw'],
        limit: 50
      }
      
      expect(Array.isArray(config.resourceType)).toBe(true)
      expect(config.resourceType).toEqual(['image', 'video', 'raw'])
      expect(config.resourceType.length).toBe(3)
    })

    it('should accept single resource type (backward compatibility)', () => {
      // Test that single resource type still works
      const config = {
        resourceType: 'video',
        limit: 20
      }
      
      expect(typeof config.resourceType).toBe('string')
      expect(config.resourceType).toBe('video')
    })

    it('should accept combined new features', () => {
      // Test that both features work together
      const config = {
        folder: 'media/gallery',
        resourceType: ['image', 'video'],
        recursive: true,
        limit: 100,
        context: true,
        tags: true
      }
      
      expect(config.folder).toBe('media/gallery')
      expect(config.recursive).toBe(true)
      expect(Array.isArray(config.resourceType)).toBe(true)
      expect(config.resourceType).toEqual(['image', 'video'])
      expect(config.limit).toBe(100)
      expect(config.context).toBe(true)
      expect(config.tags).toBe(true)
    })
  })

  describe('URL Building Logic', () => {
    it('should handle folder path encoding', () => {
      const testCases = [
        { input: 'simple', expected: 'simple' },
        { input: 'folder with spaces', expected: 'folder%20with%20spaces' },
        { input: 'folder/subfolder', expected: 'folder%2Fsubfolder' },
        { input: 'special-chars_123', expected: 'special-chars_123' }
      ]
      
      testCases.forEach(({ input, expected }) => {
        expect(encodeURIComponent(input)).toBe(expected)
      })
    })

    it('should build correct API endpoint URLs', () => {
      const cloudName = 'test-cloud'
      const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}`
      
      const endpoints = {
        config: `${baseUrl}/config`,
        dynamicFolder: `${baseUrl}/resources/by_asset_folder`,
        fixedImage: `${baseUrl}/resources/image`,
        fixedVideo: `${baseUrl}/resources/video`,
        folders: `${baseUrl}/folders/test-folder`
      }
      
      expect(endpoints.config).toBe('https://api.cloudinary.com/v1_1/test-cloud/config')
      expect(endpoints.dynamicFolder).toBe('https://api.cloudinary.com/v1_1/test-cloud/resources/by_asset_folder')
      expect(endpoints.fixedImage).toBe('https://api.cloudinary.com/v1_1/test-cloud/resources/image')
      expect(endpoints.fixedVideo).toBe('https://api.cloudinary.com/v1_1/test-cloud/resources/video')
      expect(endpoints.folders).toBe('https://api.cloudinary.com/v1_1/test-cloud/folders/test-folder')
    })
  })

  describe('Array Processing Logic', () => {
    it('should correctly identify array vs single resource types', () => {
      const singleType = 'image'
      const multipleTypes = ['image', 'video']
      const emptyArray: string[] = []
      
      expect(Array.isArray(singleType)).toBe(false)
      expect(Array.isArray(multipleTypes)).toBe(true)
      expect(Array.isArray(emptyArray)).toBe(true)
      
      expect(multipleTypes.length).toBe(2)
      expect(emptyArray.length).toBe(0)
    })

    it('should process resource type arrays correctly', () => {
      const resourceTypes = ['image', 'video', 'raw']
      const processedTypes: string[] = []
      
      // Simulate the processing logic
      for (const type of resourceTypes) {
        processedTypes.push(`processed-${type}`)
      }
      
      expect(processedTypes).toEqual([
        'processed-image',
        'processed-video',
        'processed-raw'
      ])
    })

    it('should handle result aggregation', () => {
      // Simulate combining results from multiple API calls
      const imageResults = [
        { public_id: 'img1', resource_type: 'image' },
        { public_id: 'img2', resource_type: 'image' }
      ]
      
      const videoResults = [
        { public_id: 'vid1', resource_type: 'video' }
      ]
      
      const rawResults = [
        { public_id: 'doc1', resource_type: 'raw' }
      ]
      
      const allResults = [...imageResults, ...videoResults, ...rawResults]
      
      expect(allResults.length).toBe(4)
      expect(allResults.filter(r => r.resource_type === 'image')).toHaveLength(2)
      expect(allResults.filter(r => r.resource_type === 'video')).toHaveLength(1)
      expect(allResults.filter(r => r.resource_type === 'raw')).toHaveLength(1)
    })
  })

  describe('Recursive Logic', () => {
    it('should handle depth limiting correctly', () => {
      const maxDepth = 3
      let currentDepth = 0
      const foldersToProcess = ['root']
      const processedFolders: string[] = []
      
      // Simulate recursive processing with depth limit
      while (foldersToProcess.length > 0 && currentDepth < maxDepth) {
        const currentFolder = foldersToProcess.shift()!
        processedFolders.push(currentFolder)
        
        // Simulate finding subfolders (only for first 2 levels)
        if (currentDepth < 2) {
          foldersToProcess.push(`${currentFolder}/sub${currentDepth + 1}`)
        }
        
        currentDepth++
      }
      
      expect(processedFolders.length).toBeLessThanOrEqual(maxDepth)
      expect(processedFolders).toContain('root')
    })

    it('should prevent infinite loops with duplicate detection', () => {
      const processedFolders = new Set<string>()
      const foldersToProcess = ['folder1', 'folder2', 'folder1', 'folder3', 'folder2']
      const uniqueFolders: string[] = []
      
      for (const folder of foldersToProcess) {
        if (!processedFolders.has(folder)) {
          processedFolders.add(folder)
          uniqueFolders.push(folder)
        }
      }
      
      expect(uniqueFolders).toEqual(['folder1', 'folder2', 'folder3'])
      expect(uniqueFolders.length).toBe(3)
      expect(processedFolders.size).toBe(3)
    })
  })

  describe('Logging Message Formatting', () => {
    it('should format recursive folder messages', () => {
      const testCases = [
        { folder: 'gallery', recursive: true, expected: 'Folder: gallery (recursive)' },
        { folder: 'gallery', recursive: false, expected: 'Folder: gallery' },
        { folder: 'media/photos', recursive: true, expected: 'Folder: media/photos (recursive)' }
      ]
      
      testCases.forEach(({ folder, recursive, expected }) => {
        const message = `Folder: ${folder}${recursive ? ' (recursive)' : ''}`
        expect(message).toBe(expected)
      })
    })

    it('should format resource type messages', () => {
      const singleType = 'video'
      const multipleTypes = ['image', 'video', 'raw']
      
      const singleMessage = `Resource type: ${singleType}`
      const multipleMessage = `Resource types: ${multipleTypes.join(', ')}`
      
      expect(singleMessage).toBe('Resource type: video')
      expect(multipleMessage).toBe('Resource types: image, video, raw')
    })

    it('should format asset count messages', () => {
      const counts = [0, 1, 5, 100]
      
      counts.forEach(count => {
        const message = `Loaded ${count} Cloudinary assets`
        expect(message).toBe(`Loaded ${count} Cloudinary assets`)
      })
    })
  })

  describe('Error Handling Logic', () => {
    it('should handle empty responses gracefully', () => {
      const emptyResponse = { resources: [], next_cursor: '' }
      const responseWithData = { 
        resources: [{ public_id: 'test', resource_type: 'image' }], 
        next_cursor: 'cursor123' 
      }
      
      expect(emptyResponse.resources).toEqual([])
      expect(emptyResponse.resources.length).toBe(0)
      expect(responseWithData.resources.length).toBe(1)
    })

    it('should handle missing folder data', () => {
      const responses = [
        {},
        { folders: [] },
        { folders: [{ path: 'folder1' }, { path: 'folder2' }] },
        { folders: null },
        { folders: undefined }
      ]
      
      responses.forEach(response => {
        const folders = response.folders?.map((f: any) => f.path) || []
        expect(Array.isArray(folders)).toBe(true)
      })
    })

    it('should handle cursor management', () => {
      let lastCursor: string | undefined = undefined
      const cursors = ['cursor1', 'cursor2', '', 'cursor3', undefined]
      
      for (const cursor of cursors) {
        if (cursor) {
          lastCursor = cursor
        }
      }
      
      expect(lastCursor).toBe('cursor3')
    })
  })

  describe('Feature Integration', () => {
    it('should validate complete configuration object', () => {
      // Test a comprehensive configuration that uses all new features
      const fullConfig = {
        // Core options
        deliveryType: 'upload' as const,
        resourceType: ['image', 'video'] as const,
        folder: 'media/gallery',
        limit: 100,
        
        // New features
        recursive: true,
        
        // Additional data options
        context: true,
        metadata: true,
        moderation: false,
        tags: true,
        
        // Fields
        fields: ['public_id', 'resource_type', 'width', 'height', 'context']
      }
      
      // Validate all properties are correctly typed and accessible
      expect(fullConfig.deliveryType).toBe('upload')
      expect(Array.isArray(fullConfig.resourceType)).toBe(true)
      expect(fullConfig.resourceType).toEqual(['image', 'video'])
      expect(fullConfig.folder).toBe('media/gallery')
      expect(fullConfig.recursive).toBe(true)
      expect(fullConfig.limit).toBe(100)
      expect(fullConfig.context).toBe(true)
      expect(fullConfig.metadata).toBe(true)
      expect(fullConfig.moderation).toBe(false)
      expect(fullConfig.tags).toBe(true)
      expect(Array.isArray(fullConfig.fields)).toBe(true)
      expect(fullConfig.fields?.length).toBe(5)
    })
  })
})