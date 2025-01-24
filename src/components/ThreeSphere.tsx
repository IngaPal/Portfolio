// src/components/ThreeSphere.tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls.js';

const ThreeSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<THREE.Mesh | null>(null); // Ссылка на кольцо

  useEffect(() => {
    if (!containerRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth / 1, window.innerWidth / 2);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    const geometry = new THREE.SphereGeometry(1, 30, 30);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    const light = new THREE.PointLight(0x00ffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);
    
    camera.position.z = 3;
    
    const controls = new OrbitControlsImpl(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    controls.enableZoom = false;

    const createParticles = () => {
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1000;
      const positions = new Float32Array(particlesCount * 3);
      const colors = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount * 3; i++) {
        const radius = 1;
        const theta = THREE.MathUtils.randFloatSpread(360);
        const phi = THREE.MathUtils.randFloatSpread(360);
        positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
        positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
        positions[i * 3 + 2] = radius * Math.cos(theta);
        colors[i * 3] = 0; // R
        colors[i * 3 + 1] = 1; // G (cyan)
        colors[i * 3 + 2] = 1; // B
      }
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      });
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      return particles;
    };
    
    const particles = createParticles();

    const createGlowingRing = () => {
      const ringGeometry = new THREE.TorusGeometry(1.2, 0.01, 16, 100);
      const ringMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.5,
        emissive: 0x000000,
        emissiveIntensity: 0.5
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      scene.add(ring);
      ringRef.current = ring; // Сохраняем ссылку на кольцо
      return ring;
    };
    
    createGlowingRing();

    const addLights = () => {
      const light1 = new THREE.PointLight(0xff0000, 1, 100);
      light1.position.set(10, 10, 10);
      scene.add(light1);
      const light2 = new THREE.PointLight(0xff00ff, 1, 100);
      light2.position.set(-10, -10, -10);
      scene.add(light2);
      const ambientLight = new THREE.AmbientLight(0x000000);
      scene.add(ambientLight);
      return [light1, light2];
    };
    
    addLights();

    const animate = () => {
      requestAnimationFrame(animate);
      // Вращение сферы
      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.001;
      // Вращение частиц
      particles.rotation.y += 0.0005;
      // Пульсация кольца
      if (ringRef.current && ringRef.current.material instanceof THREE.Material) {
        const time = Date.now() * 0.001;
        ringRef.current.scale.setScalar(1 + Math.sin(time) * 0.1);
        ringRef.current.material.opacity = 0.5 + Math.sin(time) * 0.2;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
      const size = window.innerWidth / 3;
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(size, size);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex justify-center items-center h-[600px] my-8"
    />
  );
};

export default ThreeSphere;