import { useRef, useEffect, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

function getAverageColor(
  imgUrl: string,
  fallback: string = "#cccccc"
): Promise<string> {
  return new Promise((resolve) => {
    const img = document.createElement("img");
    img.crossOrigin = "Anonymous";
    img.src = imgUrl;
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(fallback);
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let r = 0,
        g = 0,
        b = 0,
        count = 0;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);
      resolve(`rgb(${r},${g},${b})`);
    };
    img.onerror = () => resolve(fallback);
  });
}

function Book3D({
  frontCover,
  onLoad,
}: {
  frontCover: string;
  onLoad?: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, frontCover);
  useEffect(() => {
    if (texture && onLoad) {
      if (texture.image && texture.image.complete) {
        onLoad();
      } else {
        texture.image.onload = () => onLoad();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texture, onLoad]);
  const [backColor, setBackColor] = useState("#cccccc");

  // Create a simple canvas texture for pages
  const pageTexture = useRef<THREE.Texture | null>(null);
  useEffect(() => {
    getAverageColor(frontCover).then(setBackColor);
    // Generate page texture only once
    if (!pageTexture.current) {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#f8f6f2";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#e0dcd2";
        for (let i = 0; i < canvas.height; i += 6) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(canvas.width, i);
          ctx.stroke();
        }
      }
      pageTexture.current = new THREE.CanvasTexture(canvas);
    }
  }, [frontCover]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1.5, 0.2]} />
      {/* Materials order: right, left, top, bottom, front, back */}
      <meshStandardMaterial
        attach="material-0"
        map={pageTexture.current}
      />{" "}
      {/* right/pages */}
      <meshStandardMaterial attach="material-1" color={backColor} />{" "}
      {/* left */}
      <meshStandardMaterial
        attach="material-2"
        map={pageTexture.current}
      />{" "}
      {/* top/pages */}
      <meshStandardMaterial attach="material-3" color="#e5e5e5" />{" "}
      {/* bottom */}
      <meshStandardMaterial attach="material-4" map={texture} /> {/* front */}
      <meshStandardMaterial attach="material-5" color={backColor} />{" "}
      {/* back */}
    </mesh>
  );
}

export default Book3D;
