/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { HeroBgConfig } from './HeroBackgroundCanvas';
import { SecureImageUploader } from './SecureImageUploader';

export interface HeroBackgroundManagerProps {
  config?: HeroBgConfig;
  onChange?: (newConfig: HeroBgConfig) => void;
  currentLiveConfig?: HeroBgConfig;
  onPublish?: (newHeroBg: HeroBgConfig) => void;
}

export function HeroBackgroundManager(props: HeroBackgroundManagerProps) {
  const activeConfig = props.currentLiveConfig || props.config || {
    type: 'cyber-grid',
    speed: 1,
    density: 40,
    color: '#E59500',
    particleSize: 2,
    interactive: true,
  };

  const handleChange = (updated: HeroBgConfig) => {
    if (props.onChange) props.onChange(updated);
    if (props.onPublish) props.onPublish(updated);
  };

  return (
    <div className="p-5 bg-[#15120E] border border-[#2C2419] rounded-3xl text-xs space-y-4">
      <div className="flex items-center justify-between border-b border-[#2C2419]/60 pb-3">
        <div>
          <span className="font-mono text-[#E59500] uppercase font-bold text-xs flex items-center gap-1.5">
            ✦ Hero Background Suite
          </span>
          <p className="text-[11px] text-[#A69D92] mt-0.5">Customize your agency hero wallpaper with subtle luxury video loops or an AI-generated cosmic nebula.</p>
        </div>
      </div>

      {/* QUICK PRESET EXPERIMENTATION BUTTONS */}
      <div>
        <label className="text-[10px] text-[#A69D92] uppercase font-mono block mb-2 font-bold">Quick Agency Luxury Presets</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => handleChange({
              type: 'nebula',
              speed: 0.8,
              density: 65,
              color: '#E59500',
              particleSize: 2,
              interactive: true,
              opacity: 70
            })}
            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
              activeConfig.type === 'nebula'
                ? 'bg-[#E59500]/15 border-[#E59500] text-[#F9F7F2]'
                : 'bg-[#231F17]/60 border-[#2C2419] text-[#A69D92] hover:text-[#F9F7F2]'
            }`}
          >
            <div className="font-bold text-xs flex items-center gap-1">🌌 AI Cosmic Nebula</div>
            <div className="text-[10px] text-[#6B6053] mt-0.5">Deep glowing space clouds</div>
          </button>

          <button
            type="button"
            onClick={() => handleChange({
              type: 'video',
              speed: 1,
              density: 40,
              color: '#E59500',
              particleSize: 2,
              interactive: true,
              videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-dust-particles-in-the-dark-41584-large.mp4',
              opacity: 50
            })}
            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
              activeConfig.type === 'video' && activeConfig.videoUrl?.includes('41584')
                ? 'bg-[#E59500]/15 border-[#E59500] text-[#F9F7F2]'
                : 'bg-[#231F17]/60 border-[#2C2419] text-[#A69D92] hover:text-[#F9F7F2]'
            }`}
          >
            <div className="font-bold text-xs flex items-center gap-1">🎥 Subtle Gold Video</div>
            <div className="text-[10px] text-[#6B6053] mt-0.5">Floating luxury gold dust</div>
          </button>

          <button
            type="button"
            onClick={() => handleChange({
              type: 'video',
              speed: 1,
              density: 40,
              color: '#E59500',
              particleSize: 2,
              interactive: true,
              videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bright-gold-lights-and-bokeh-in-motion-41588-large.mp4',
              opacity: 45
            })}
            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
              activeConfig.type === 'video' && activeConfig.videoUrl?.includes('41588')
                ? 'bg-[#E59500]/15 border-[#E59500] text-[#F9F7F2]'
                : 'bg-[#231F17]/60 border-[#2C2419] text-[#A69D92] hover:text-[#F9F7F2]'
            }`}
          >
            <div className="font-bold text-xs flex items-center gap-1">✨ Bokeh Lights Video</div>
            <div className="text-[10px] text-[#6B6053] mt-0.5">Soft ambient light loops</div>
          </button>

          <button
            type="button"
            onClick={() => handleChange({
              type: 'cyber-grid',
              speed: 1,
              density: 40,
              color: '#E59500',
              particleSize: 2,
              interactive: true,
              opacity: 40
            })}
            className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
              activeConfig.type === 'cyber-grid'
                ? 'bg-[#E59500]/15 border-[#E59500] text-[#F9F7F2]'
                : 'bg-[#231F17]/60 border-[#2C2419] text-[#A69D92] hover:text-[#F9F7F2]'
            }`}
          >
            <div className="font-bold text-xs flex items-center gap-1">🕸️ Cyber Particles</div>
            <div className="text-[10px] text-[#6B6053] mt-0.5">Interactive grid particle canvas</div>
          </button>
        </div>
      </div>

      <div>
        <label className="text-[10px] text-[#A69D92] block mb-1 font-mono uppercase">Background Mode</label>
        <select
          value={activeConfig.type || 'cyber-grid'}
          onChange={(e) => {
            const val = e.target.value;
            let defaultVid = activeConfig.videoUrl;
            if (val === 'video' && !defaultVid) {
              defaultVid = 'https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-dust-particles-in-the-dark-41584-large.mp4';
            }
            handleChange({ ...activeConfig, type: val, videoUrl: defaultVid });
          }}
          className="w-full bg-[#231F17] border border-[#2C2419] rounded-xl px-3 py-2 text-xs text-[#F9F7F2] focus:border-[#E59500] outline-none"
        >
          <option value="nebula">🌌 AI Cosmic Nebula (Generative Canvas)</option>
          <option value="video">🎥 Subtle Video Background (MP4/WebM)</option>
          <option value="cyber-grid">🕸️ Cyber Grid Particles</option>
          <option value="image">🖼️ Image Wallpaper</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="text-[10px] text-[#A69D92] block mb-1 font-mono uppercase">
          Opacity Level ({activeConfig.opacity !== undefined ? activeConfig.opacity : 40}%)
        </label>
        <input
          type="range"
          min="5"
          max="100"
          value={activeConfig.opacity !== undefined ? activeConfig.opacity : 40}
          onChange={(e) => handleChange({ ...activeConfig, opacity: Number(e.target.value) })}
          className="w-full accent-[#E59500]"
        />
      </div>

      {(activeConfig.type === 'cyber-grid' || activeConfig.type === 'nebula') && (
        <div className="grid grid-cols-2 gap-3 bg-[#231F17]/40 p-3 rounded-2xl border border-[#2C2419]">
          <div>
            <label className="text-[10px] text-[#A69D92] block mb-1 font-mono">Density ({activeConfig.density || 40})</label>
            <input
              type="range"
              min="10"
              max="100"
              value={activeConfig.density || 40}
              onChange={(e) => handleChange({ ...activeConfig, density: Number(e.target.value) })}
              className="w-full accent-[#E59500]"
            />
          </div>
          <div>
            <label className="text-[10px] text-[#A69D92] block mb-1 font-mono">Motion Speed ({activeConfig.speed || 1}x)</label>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.1"
              value={activeConfig.speed || 1}
              onChange={(e) => handleChange({ ...activeConfig, speed: Number(e.target.value) })}
              className="w-full accent-[#E59500]"
            />
          </div>
        </div>
      )}

      {activeConfig.type === 'image' && (
        <div className="space-y-3 bg-[#231F17]/40 p-3 rounded-2xl border border-[#2C2419]">
          <SecureImageUploader 
            label="Upload Image Wallpaper (Optimized)" 
            accept="image/*"
            onUpload={(dataUrl) => handleChange({ ...activeConfig, imageUrl: dataUrl })} 
          />
          <div>
            <label className="text-[10px] text-[#A69D92] block mb-1 font-mono">Or Image URL</label>
            <input
              type="text"
              value={activeConfig.imageUrl || ''}
              onChange={(e) => handleChange({ ...activeConfig, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-[#15120E] border border-[#2C2419] rounded-xl px-3 py-2 text-xs text-[#F9F7F2] focus:border-[#E59500] outline-none"
            />
          </div>
          {activeConfig.imageUrl && (
            <div className="mt-2 rounded-xl overflow-hidden border border-[#2C2419] aspect-video w-full bg-black">
              <img src={activeConfig.imageUrl} alt="Preview" className="w-full h-full object-cover opacity-60" />
            </div>
          )}
        </div>
      )}

      {activeConfig.type === 'video' && (
        <div className="space-y-3 bg-[#231F17]/40 p-3 rounded-2xl border border-[#2C2419]">
          <SecureImageUploader 
            label="Upload Custom Video MP4/WebM" 
            accept="video/*"
            onUpload={(dataUrl) => handleChange({ ...activeConfig, videoUrl: dataUrl })} 
          />
          <div>
            <label className="text-[10px] text-[#A69D92] block mb-1 font-mono">Video MP4 / WebM URL</label>
            <input
              type="text"
              value={activeConfig.videoUrl || ''}
              onChange={(e) => handleChange({ ...activeConfig, videoUrl: e.target.value })}
              placeholder="https://example.com/video.mp4"
              className="w-full bg-[#15120E] border border-[#2C2419] rounded-xl px-3 py-2 text-xs text-[#F9F7F2] focus:border-[#E59500] outline-none"
            />
          </div>
          {activeConfig.videoUrl && (
            <div className="mt-2 rounded-xl overflow-hidden border border-[#2C2419] aspect-video w-full bg-black relative">
              <video src={activeConfig.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60" />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[9px] font-mono text-[#E59500]">
                Active Subtle Video Background
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


