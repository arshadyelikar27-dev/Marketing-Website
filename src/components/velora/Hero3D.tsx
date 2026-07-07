import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cylinder, Torus, Box, Circle } from '@react-three/drei';
import * as THREE from 'three';
import { useScreenSize } from '../../hooks/useScreenSize';

interface Particle {
  position: [number, number, number];
  opacity: number;
}

function Scene({ scrollYRef, isMobile }: { scrollYRef: React.MutableRefObject<number>, isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const lensRef = useRef<THREE.Group>(null);
  const progressRef = useRef(0);

  // Generate particles once to prevent recalculating and recreating them on every render
  // Generate fewer particles on mobile to improve performance and prevent lag
  const particles = useMemo<Particle[]>(() => {
    const count = isMobile ? 15 : 35;
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 6 - 2,
      ],
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, [isMobile]);

  const introProgressRef = useRef(0);

  useFrame((state) => {
    // Single consolidated useFrame for optimal performance
    const maxScroll = window.innerHeight || 800;
    const target = Math.min(scrollYRef.current / maxScroll, 1);
    
    // Smooth lerp (scrubbing) for scroll
    progressRef.current = THREE.MathUtils.lerp(progressRef.current, target, 0.08);
    const p = progressRef.current;

    // Intro entrance animation (lerp from 0 to 1 over time)
    // Using a slightly slower lerp (0.03) for a very cinematic, elegant rotation
    introProgressRef.current = THREE.MathUtils.lerp(introProgressRef.current, 1, 0.03);
    const intro = introProgressRef.current;

    if (groupRef.current) {
      // Rotation: Smooth rotation tied to scroll + subtle mouse parallax
      // Reduce mouse parallax effect on mobile since there is no mouse
      const mouseMult = isMobile ? 0 : 1;
      
      // Calculate final target rotation based on scroll and mouse
      const targetRotationY = p * Math.PI * 1.8 + state.pointer.x * 0.12 * mouseMult;
      const targetRotationX = p * Math.PI * 0.3 + -state.pointer.y * 0.08 * mouseMult;

      // Entrance animation: start rotated backwards (Math.PI * 1.5) and tilted, 
      // then interpolate to the target rotation based on 'intro' progress
      const startRotationY = Math.PI * 1.5;
      const startRotationX = -Math.PI * 0.5;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(startRotationY, targetRotationY, intro);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(startRotationX, targetRotationX, intro);
    }

    if (lensRef.current) {
      // Micro-animation: Lens barrel extends slightly during scroll
      lensRef.current.position.z = 0.5 + p * 0.25;
    }

    // Camera Dolly: Smoothly back away from the camera model as user scrolls
    // Also include a slight zoom-in effect during the intro
    const startZ = isMobile ? 5.5 : 3.5; 
    const endZ = isMobile ? 9.5 : 7.5;
    const scrollZ = THREE.MathUtils.lerp(startZ, endZ, p);
    
    // Start slightly further away and zoom in on load
    const introStartZ = startZ + 2; 
    state.camera.position.z = THREE.MathUtils.lerp(introStartZ, scrollZ, intro);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      
      {/* Key Front-Right Light */}
      <directionalLight position={[5, 5, 4]} intensity={1.8} color="#f4efe6" />
      
      {/* Fill Left Light */}
      <directionalLight position={[-4, 2, 3]} intensity={0.6} color="#4a423a" />
      
      {/* GOLD RIM LIGHTING */}
      <directionalLight position={[-4, 4, -5]} intensity={4.5} color="#c9a24c" />
      <pointLight position={[2, 2, -3]} intensity={3.5} color="#c9a24c" />

      <group ref={groupRef} position={[0, 0.2, 0]}>
        {/* CAMERA BODY */}
        {/* Main Chassis */}
        <Box args={[1.5, 1.2, 1.2]} position={[0, 0, -0.4]}>
          <meshStandardMaterial
            color="#0c0c0c"
            metalness={0.9}
            roughness={0.15}
            envMapIntensity={1.5}
          />
        </Box>

        {/* Top Handle */}
        <Box args={[0.2, 0.3, 0.9]} position={[0, 0.75, -0.4]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </Box>
        <Box args={[0.2, 0.1, 1.2]} position={[0, 0.9, -0.2]}>
          <meshStandardMaterial color="#c9a24c" metalness={0.95} roughness={0.15} />
        </Box>

        {/* Side Control Panel */}
        <Box args={[0.1, 0.6, 0.8]} position={[0.76, 0, -0.4]}>
          <meshStandardMaterial color="#151515" metalness={0.85} roughness={0.2} />
        </Box>
        
        {/* Details/Buttons on Panel */}
        <Cylinder args={[0.08, 0.08, 0.05, 16]} position={[0.82, 0.1, -0.2]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#c9a24c" metalness={0.9} roughness={0.15} />
        </Cylinder>
        <Cylinder args={[0.05, 0.05, 0.05, 16]} position={[0.82, -0.15, -0.4]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#a12525" metalness={0.5} roughness={0.5} />
        </Cylinder>

        {/* LENS ASSEMBLY */}
        <group ref={lensRef} position={[0, 0, 0.5]}>
          {/* Main Outer Barrel */}
          <Cylinder args={[0.55, 0.6, 0.8, 32]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial
              color="#080808"
              metalness={0.9}
              roughness={0.2}
            />
          </Cylinder>

          {/* Gold Accent Ring */}
          <Torus args={[0.61, 0.03, 16, 64]} position={[0, 0, 0.25]} rotation={[0, 0, 0]}>
            <meshStandardMaterial
              color="#c9a24c"
              metalness={0.98}
              roughness={0.1}
              emissive="#c9a24c"
              emissiveIntensity={0.15}
            />
          </Torus>

          {/* Focus & Aperture Ridges */}
          <Torus args={[0.58, 0.015, 8, 64]} position={[0, 0, 0.05]} rotation={[0, 0, 0]}>
            <meshStandardMaterial color="#151515" metalness={0.9} roughness={0.4} />
          </Torus>
          <Torus args={[0.58, 0.015, 8, 64]} position={[0, 0, -0.15]} rotation={[0, 0, 0]}>
            <meshStandardMaterial color="#151515" metalness={0.9} roughness={0.4} />
          </Torus>

          {/* Front Bezel */}
          <Cylinder args={[0.48, 0.53, 0.1, 32]} position={[0, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
          </Cylinder>

          {/* Gold Inner Bezel Rim */}
          <Torus args={[0.48, 0.02, 16, 64]} position={[0, 0, 0.45]}>
            <meshStandardMaterial
              color="#c9a24c"
              metalness={0.98}
              roughness={0.1}
            />
          </Torus>

          {/* Lens Glass Element */}
          <Circle args={[0.45, 32]} position={[0, 0, 0.43]}>
            <meshStandardMaterial
              color="#0f172a"
              metalness={0.9}
              roughness={0.05}
              transparent
              opacity={0.7}
            />
          </Circle>
        </group>

        {/* Floating Cine Particles */}
        {particles.map((pt, i) => (
          <mesh key={i} position={pt.position}>
            <sphereGeometry args={[0.012, 6, 6]} />
            <meshBasicMaterial
              color="#c9a24c"
              transparent
              opacity={pt.opacity}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function Hero3D() {
  const scrollYRef = useRef(0);
  const [visible, setVisible] = useState(false);
  const { isMobile, isTablet } = useScreenSize();

  useEffect(() => {
    const onScroll = () => {
      scrollYRef.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Small delay so WebGL has time to compile shaders before we fade in
    const t = setTimeout(() => setVisible(true), 80);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(t);
    };
  }, []);

  return (
    <div
      className="w-full h-full"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, isMobile ? 5.5 : 4.5], fov: isMobile ? 50 : 40 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={isMobile ? [1, 1] : [1, 1.5]} // Lower DPR on mobile for better performance (no lag)
        className="absolute inset-0 w-full h-full"
      >
        <Scene scrollYRef={scrollYRef} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}

