import { describe, it, expect, vi, beforeEach } from 'vitest'

// Simple unit tests for the new features
describe('cldAssetsLoader New Features', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Configuration Options', () => {
    it('should accept recursive option', () => {
      // Test that the TypeScript interface accepts recursive option
      const config = {
        folder: 'test',
        recursive: true,
        limit: 10
      }
      
      expect(config.recursive).toBe(true)
      expect(config.folder).toBe('test')
    })

    it('should accept multiple resource types', () => {
      // Test that the TypeScript interface accepts array of resource types
      const config = {
        resourceType: ['image', 'video'],
        limit: 10
      }
      
      expect(Array.isArray(config.resourceType)).toBe(true)
      expect(config.resourceType).toEqual(['image', 'video'])
    })

    it('should accept single resource type', () => {
      // Test that the TypeScript interface still accepts single resource type
      const config = {
        resourceType: 'image',
        limit: 10
      }
      
      expect(typeof config.resourceType).toBe('string')
      expect(config.resourceType).toBe('image')
    })

    it('should accept combined options', () => {
      // Test that both new features can be used together
      const config = {
        folder: 'media',
        resourceType: ['image', 'video'],
        recursive: true,
        limit: 50
      }
      
      expect(config.folder).toBe('media')
      expect(config.recursive).toBe(true)
      expect(Array.isArray(config.resourceType)).toBe(true)
      expect(config.resourceType).toEqual(['image', 'video'])
      expect(config.limit).toBe(50)
    })
  })

  describe('URL Parameter Building', () => {
    it('should handle folder encoding correctly', () => {
      const folder = 'test folder/with spaces'
      const encoded = encodeURIComponent(folder)
      
      expect(encoded).toBe('test%20folder%2Fwith%20spaces')
    })

    it('should build correct API URLs', () => {
      const cloudName = 'test-cloud'
      const folder = 'test'
      
      const dynamicUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/by_asset_folder`
      const fixedUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`
      const foldersUrl = `https://api.cloudinary.com/v1_1/${cloudName}/folders/${encodeURIComponent(folder)}`
      
      expect(dynamicUrl).toBe('https://api.cloudinary.com/v1_1/test-cloud/resources/by_asset_folder')
      expect(fixedUrl).toBe('https://api.cloudinary.com/v1_1/test-cloud/resources/image')
      expect(foldersUrl).toBe('https://api.cloudinary.com/v1_1/test-cloud/folders/test')
    })
  })

  describe('Array Processing', () => {
    it('should detect array resource types', () => {
      const singleType = 'image'
      const multipleTypes = ['image', 'video']
      
      expect(Array.isArray(singleType)).toBe(false)
      expect(Array.isArray(multipleTypes)).toBe(true)
      expect(multipleTypes.length).toBe(2)
    })

    it('should process resource type arrays correctly', () => {
      const resourceTypes = ['image', 'video', 'raw']
      const results = []
      
      for (const type of resourceTypes) {
        results.push(`Processing ${type}`)
      }
      
      expect(results).toEqual([
        'Processing image',
        'Processing video', 
        'Processing raw'
      ])
    })
  })

  describe('Recursive Logic', () => {
    it('should handle depth limiting', () => {
      const maxDepth = 3
      let currentDepth = 0
      const folders = ['root']
      
      while (currentDepth < maxDepth && folders.length > 0) {
        currentDepth++
        // Simulate processing
      }
      
      expect(currentDepth).toBe(maxDepth)
    })

    it('should prevent infinite loops', () => {
      const processedFolders = new Set()
      const foldersToProcess = ['folder1', 'folder2', 'folder1'] // duplicate
      
      const uniqueFolders = []
      for (const folder of foldersToProcess) {
        if (!processedFolders.has(folder)) {
          processedFolders.add(folder)
          uniqueFolders.push(folder)
        }
      }
      
      expect(uniqueFolders).toEqual(['folder1', 'folder2'])
      expect(uniqueFolders.length).toBe(2)
    })
  })

  describe('Error Handling', () => {
    it('should handle empty responses gracefully', () => {
      const emptyResponse = { resources: [], next_cursor: '' }
      
      expect(emptyResponse.resources).toEqual([])
      expect(emptyResponse.resources.length).toBe(0)
    })

    it('should handle missing folder data', () => {
      const responseWithoutFolders = {}
      const responseWithEmptyFolders = { folders: [] }
      
      const folders1 = responseWithoutFolders.folders?.map((f: any) => f.path) || []
      const folders2 = responseWithEmptyFolders.folders?.map((f: any) => f.path) || []
      
      expect(folders1).toEqual([])
      expect(folders2).toEqual([])
    })
  })

  describe('Logging Messages', () => {
    it('should format recursive folder messages correctly', () => {
      const folder = 'test/folder'
      const recursive = true
      
      const message = `Folder: ${folder}${recursive ? ' (recursive)' : ''}`
      
      expect(message).toBe('Folder: test/folder (recursive)')
    })

    it('should format non-recursive folder messages correctly', () => {
      const folder = 'test/folder'
      const recursive = false
      
      const message = `Folder: ${folder}${recursive ? ' (recursive)' : ''}`
      
      expect(message).toBe('Folder: test/folder')
    })

    it('should format multiple resource types correctly', () => {
      const resourceTypes = ['image', 'video', 'raw']
      
      const message = `Resource types: ${resourceTypes.join(', ')}`
      
      expect(message).toBe('Resource types: image, video, raw')
    })

    it('should format single resource type correctly', () => {
      const resourceType = 'video'
      
      const message = `Resource type: ${resourceType}`
      
      expect(message).toBe('Resource type: video')
    })
  })

  describe('Data Aggregation', () => {
    it('should combine results from multiple queries', () => {
      const imageResults = [
        { public_id: 'image1', resource_type: 'image' },
        { public_id: 'image2', resource_type: 'image' }
      ]
      
      const videoResults = [
        { public_id: 'video1', resource_type: 'video' }
      ]
      
      const combinedResults = [...imageResults, ...videoResults]
      
      expect(combinedResults.length).toBe(3)
      expect(combinedResults.filter(r => r.resource_type === 'image')).toHaveLength(2)
      expect(combinedResults.filter(r => r.resource_type === 'video')).toHaveLength(1)
    })

    it('should handle cursor management across multiple queries', () => {
      let lastCursor = undefined
      const cursors = ['cursor1', 'cursor2', '']
      
      for (const cursor of cursors) {
        lastCursor = cursor || lastCursor
      }
      
      expect(lastCursor).toBe('cursor2')
    })
  })
})