'use client';

import { useRef, useEffect, useState } from 'react';
import type { Domain } from '@/lib/problemStatements';

interface CertificateCanvasProps {
  participantName: string;
  teamName: string;
  domain: Domain;
}

export default function CertificateCanvas({ participantName, teamName, domain }: CertificateCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasWidth = 1200;
    const canvasHeight = 850;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Load background image
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      
      // Draw background image
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      // Set text properties
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Draw participant name and team name on one line in ALL CAPS
      const fullName = `${participantName.toUpperCase()} (${teamName.toUpperCase()})`;
      const centerY = 428;
      
      ctx.font = 'bold 48px Seasons, serif';
      ctx.fillStyle = '#000000';
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.textAlign = 'center';
      ctx.fillText(fullName, canvasWidth / 2, centerY);

      // // Draw domain
      // ctx.font = '22px Seasons, serif';
      // ctx.fillStyle = '#aaaaaa';
      // ctx.shadowBlur = 2;
      // ctx.shadowOffsetX = 1;
      // ctx.shadowOffsetY = 1;
      // ctx.fillText(`Domain: ${domain.toUpperCase()}`, canvasWidth / 2, 470);

      setCertificateGenerated(true);
    };

    img.onerror = () => {
      // If image fails to load, create a placeholder background
      console.warn('Certificate template image not found, using placeholder');
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Add border
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 10;
      ctx.strokeRect(20, 20, canvasWidth - 40, canvasHeight - 40);

      // Add placeholder text
      ctx.font = '48px Seasons, serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText('TechBlitz26', canvasWidth / 2, 150);

      ctx.font = '24px Seasons, serif';
      ctx.fillStyle = '#cccccc';
      ctx.fillText('Certificate of Participation', canvasWidth / 2, 200);

      // Draw participant name and team name on one line in ALL CAPS
      const fullName = `${participantName.toUpperCase()} (${teamName.toUpperCase()})`;
      const centerY = 380;

      // Draw the combined name
      ctx.font = 'bold 46px Seasons, serif';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.textAlign = 'center';
      ctx.fillText(fullName, canvasWidth / 2, centerY);

      // Draw domain
      ctx.font = '22px Seasons, serif';
      ctx.fillStyle = '#aaaaaa';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillText(`Domain: ${domain.toUpperCase()}`, canvasWidth / 2, 470);

      // Add note about template
      ctx.font = '16px Seasons, serif';
      ctx.fillStyle = '#888888';
      ctx.shadowBlur = 0;
      ctx.fillText('Replace certificate-template.png with your actual template', canvasWidth / 2, 800);

      setImageLoaded(true);
      setCertificateGenerated(true);
    };

    img.src = '/certificate.png';
  }, [participantName, teamName, domain]);

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas || !certificateGenerated) return;

    const link = document.createElement('a');
    link.download = `certificate-${participantName.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const saveCertificate = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !certificateGenerated) return;

    try {
      const dataUrl = canvas.toDataURL('image/png');
      
      const response = await fetch('/api/certificate/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamName,
          participantName,
          certificateDataUrl: dataUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to save certificate');
        return;
      }

      alert('Certificate saved successfully!');
    } catch {
      alert('Failed to save certificate');
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white">Loading certificate...</div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-auto"
          style={{ maxWidth: '800px' }}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={downloadCertificate}
          disabled={!certificateGenerated}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg border-2 border-red-900"
        >
          Download Certificate
        </button>
        {/* <button
          onClick={saveCertificate}
          disabled={!certificateGenerated}
          className="flex-1 px-6 py-3 border border-[#ffffff20] text-white font-semibold rounded-lg hover:bg-[#ffffff10] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save to Profile
        </button> */}
      </div>
    </div>
  );
}
