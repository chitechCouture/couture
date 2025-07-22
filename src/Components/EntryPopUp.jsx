
import { createRoot } from 'react-dom/client'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {Decal, OrbitControls, useGLTF, useTexture} from '@react-three/drei'
import {useControls} from "leva";
import  LogoSvg from '../assets/ctslogo.jpg';
import {texture} from "three/src/Three.TSL";

// Setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

function ShoppingBag({ path, logoUrl, chooseBag, setChooseBag, bagColor, setBagColor }) {
    const { scene } = useGLTF(path);
    const ref = useRef();
    const [targetMesh, setTargetMesh] = useState(null);

    // ✅ Convert SVG to canvas texture
    const logoTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        const tex = new THREE.CanvasTexture(canvas);
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, 128, 128);
            tex.needsUpdate = true;
        };
        img.src = LogoSvg;

        return tex;
    }, [logoUrl]);

    // ✅ Safely locate mesh AFTER scene loads
    useEffect(() => {
        if (!scene) return;

        ref.current.traverse((child) => {
            console.log(ref)
            if (child.isMesh) {
                if (child.material?.color) {
                    ref.current = child;
                    child.material = child.material.clone(); // avoid mutating shared material
                    child.material.color.set(bagColor);

                }
            }
        })

        const mesh = scene.getObjectByName('Mesh10');

        if (mesh) {
            setTargetMesh(mesh);
        } else {
            console.warn('❌ Mesh10 is missing or invalid:', mesh);
        }
    }, [scene, bagColor]);

    // Optional animation
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.002;
        }
    });

    const chooseAbag = (event) => {
        event.stopPropagation();
        setChooseBag(path)
    };

    return (
        <group ref={ref}>
            <primitive object={scene} scale={3} onClick={chooseAbag} />

            {/* ✅ Only render if mesh is valid */}
            {/*{targetMesh && (*/}
            {/*    <mesh>*/}
            {/*        <sphereGeometry />*/}
            {/*        <meshBasicMaterial />*/}
            {/*        <Decal*/}
            {/*            debug*/}
            {/*            position={[0, 0.5, 0.3]}*/}
            {/*            scale={1.2}*/}
            {/*            polygonOffset*/}
            {/*            polygonOffsetFactor={5}*/}
            {/*        >*/}
            {/*            <meshBasicMaterial map={logoTexture} />*/}
            {/*        </Decal>*/}
            {/*    </mesh>*/}
            {/*)}*/}
        </group>
    );
}


export default function PopUpCanvas(onClose) {
    const [chooseBag, setChooseBag] = useState('all');
    const [bagColor, setBagColor] = useState('#fff');
    const [gotBag, setgotBag] = useState(false);
    console.log(chooseBag);

    const bagModels = [
        { title: 'A', url: 'bags/shopping_bag1.glb' },
        { title: 'B', url: 'bags/shopping_bag2.glb', }
    ]

    const bags = chooseBag === 'all' ? bagModels : [{url: chooseBag}];
    const buttonData = [
        { id: 1, label: 'Red', value: '#d91630' },
        { id: 2, label: 'Pink', value: '#e86fe6' },
        { id: 3, label: 'Purple', value: '#9a22e0' },
        { id: 4, label: 'Blue', value: '#525ade' },
        { id: 5, label: 'Black', value: '#000' },
        { id: 6, label: 'Yellow', value: '#e1e815' },
    ];

    const chooseColor = (value) => {
        setBagColor(value);
        setgotBag(true);
    };
    console.log(bagColor);


    return (<>
        { bags.length < 2 ?
            <div>
            Choose your bag color <br/><br/>
                {buttonData.map((button) => (
                    <button key={button.id} style={{backgroundColor: button.value, color: 'white', padding: '1vw 2vw', borderRadius: "50%"}} onClick={() => chooseColor(button.value)}>
                        {button.label}
                    </button>
                ))}

        </div> : <div> Choose your bag style </div>}

        {bags?.map((bag, index) => (
        <Canvas camera={{ position: [4, -1, 4], near: 0.55 }}>
            <spotLight position={[10, 20, 10]} angle={0.5} decay={0} intensity={Math.PI} />
            <pointLight position={[-20, -10, -20]} decay={0}  />
            <directionalLight position={[15, 15, 15]} intensity={0.8} />
                <ShoppingBag path={bag.url} logo="bags/ctslogo.jpg" chooseBag={chooseBag} setChooseBag={setChooseBag} bagColor={bagColor} setBagColor={setBagColor} />
            <OrbitControls autoRotate />
        </Canvas>
    ))
    }
    <br/>    </>)
    }