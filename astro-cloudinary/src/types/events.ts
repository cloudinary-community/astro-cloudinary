// CldVideoPlayer event details
export interface CldVideoPlayerEventDetail {
  Player: any;
  type: string;
  Video: HTMLVideoElement;
}

// CldUploadWidget event details
export interface CldUploadWidgetEventDetail {
  event: string;
  info?: any;
  UploadWidget: any;
}

export interface CldUploadWidgetErrorEventDetail {
  event: 'error';
  error: any;
  UploadWidget: HTMLSpanElement;
}

// CldImage event details
export interface CldImageErrorEventDetail {
  error: Event | string;
  Image: HTMLImageElement;
}

// Declare custom events for better type safety
declare global {
  interface WindowEventMap {
    'cldvideoplayer:loadstart': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:suspend': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:abort': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:error': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:emptied': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:stalled': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:loadedmetadata': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:loadeddata': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:canplay': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:canplaythrough': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:playing': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:waiting': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:seeking': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:seeked': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:ended': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:durationchange': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:timeupdate': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:progress': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:play': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:pause': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:ratechange': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:volumechange': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:fullscreenchange': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:posterchange': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:mute': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:unmute': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:percentsplayed': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:timeplayed': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:seek': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:sourcechanged': CustomEvent<CldVideoPlayerEventDetail>;
    'cldvideoplayer:qualitychanged': CustomEvent<CldVideoPlayerEventDetail>;
  }
  
  interface HTMLElementEventMap {
    'clduploadwidget:error': CustomEvent<CldUploadWidgetErrorEventDetail>;
    'clduploadwidget:success': CustomEvent<CldUploadWidgetEventDetail>;
    'clduploadwidget:queues-end': CustomEvent<CldUploadWidgetEventDetail>;
    'cldimage:error': CustomEvent<CldImageErrorEventDetail>;
  }
} 