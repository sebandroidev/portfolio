# Videos Directory

This directory contains local video files for project showcases.

## Recommended Video Specifications

### For Best Performance:

- **Format**: MP4 (H.264 codec)
- **Size**: Under 10MB for web delivery
- **Resolution**: 1280x720 (720p) or 1920x1080 (1080p)
- **Frame Rate**: 30fps
- **Bitrate**: 1-3 Mbps

### File Naming Convention:

- `project-name-demo.mp4` - Main demo video
- `project-name-poster.jpg` - Poster/thumbnail image

## Compression Commands

If your video is too large (like 60MB), compress it using FFmpeg:

### High Quality (Recommended):

```bash
ffmpeg -i input-video.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k project-demo.mp4
```

### Medium Quality (Smaller Size):

```bash
ffmpeg -i input-video.mp4 -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 96k project-demo.mp4
```

### High Compression (Smallest Size):

```bash
ffmpeg -i input-video.mp4 -c:v libx264 -crf 32 -preset medium -c:a aac -b:a 64k project-demo.mp4
```

## Creating Poster Images

Extract a poster frame from your video:

```bash
ffmpeg -i your-video.mp4 -ss 00:00:02 -vframes 1 -q:v 2 poster.jpg
```

## Current Videos:

- `mellow-demo.mp4` - Mellow project demonstration
- `mellow-poster.jpg` - Mellow project poster image

## Usage in Code:

```typescript
{
  title: "Your Project",
  video: "/videos/your-video.mp4",
  videoType: "direct" as const,
  poster: "/videos/your-poster.jpg",
}
```
