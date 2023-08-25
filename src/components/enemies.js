import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, quat } from "@react-three/rapier";

export default function AnimeWall(props) {
  const ref = useRef();
  const vel = 3;

  useFrame(() => {
    const { current: body } = ref;
    const animePos = body?.translation();

    body?.setTranslation({ x: animePos.x, y: animePos.y, z: animePos.z });

    if (animePos.x >= props.posX) {
      body?.setLinvel({ x: -vel, y: 0, z: 0 });
    }

    if (animePos.x <= -props.posX) {
      body?.setLinvel({ x: vel, y: 0, z: 0 });
    }
  });
  return (
    <RigidBody
      position={props.pos}
      type="kinematicVelocity"
      ref={ref}
      colliders="trimesh"
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={props.args} />
        <meshStandardMaterial flatShading color={props.color} />
      </mesh>
    </RigidBody>
  );
}

// AnimeStretch...

export function AnimeStretch(props) {
  const ref = useRef();
  const vel = 2.5;

  useFrame(() => {
    const { current: body } = ref;

    if (body) {
      const animePos = body?.translation();
  
      body?.setTranslation({ x: animePos.x, y: animePos.y, z: animePos.z });
  
      if (animePos.y >= props.posY) {
        body?.setLinvel({ x: 0, y: -vel, z: 0 });
      }
  
      if (animePos.y <= -(props.posY + 0.5)) {
        body?.setLinvel({ x: 0, y: vel, z: 0 });
      }
    };
  });

  return (
    <RigidBody
      type="kinematicVelocity"
      position={props.pos}
      ref={ref}
      colliders="trimesh"
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={props.args} />
        <meshStandardMaterial flatShading color={props.color} />
      </mesh>
    </RigidBody>
  );
}

// AnimeGroup...

export function AnimeGroup(props) {
  const kicker = useRef();

  useFrame(() => {
    const { current: group } = kicker;
    if (group) {
      const quaternion = quat(group.rotation());
      group?.setRotation(quaternion, true);
      group?.setAngvel({ x: 0, y: props.rot, z: 0 }, true);
    }
  });

  return (
    <RigidBody
      type="kinematicVelocity"
      colliders="trimesh"
      position={props.pos}
      ref={kicker}
    >
      <group dispose={null}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 0.7, 4, 32, 20]} />
          <meshStandardMaterial color={props.color} flatShading />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[0, 1.5, 0]}
          rotation={[0, 1.5, 0]}
        >
          <boxGeometry args={[7.9, 0.5, 0.5]} />
          <meshStandardMaterial color={props.color} flatShading />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        >
          <boxGeometry args={[7.9, 0.5, 0.5]} />
          <meshStandardMaterial color={props.color} flatShading />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          position={[0, -1.5, 0]}
          rotation={[0, 1.5, 0]}
        >
          <boxGeometry args={[7.9, 0.5, 0.5]} />
          <meshStandardMaterial color={props.color} flatShading />
        </mesh>
      </group>
    </RigidBody>
  );
}

// Enemies gathered

export function Enemies(props) {
  const instances = useMemo(() => {
    const instances = [];
    const yStr = [1, -1.5];
    const xWall = [2.75, -2.75];
    const yRot = [3.5, -3.75];
    const Apos = [15, 7, -1, -9, -17];

    for (let i = 0; i <= 4; i++) {
      let enemies = [
        <AnimeWall
          args={[3, 3, 0.5, 5, 5, 5]}
          posX={2.75}
          pos={[
            xWall[Math.floor(Math.random() * xWall.length)],
            -0.25,
            Apos[i]
          ]}
          color={"#CD1818"}
          key={"enemie: " + i}
        />,
        <AnimeStretch
          args={[7.9, 0.5, 0.5, 5, 5, 5]}
          posY={1}
          pos={[0, yStr[Math.floor(Math.random() * yStr.length)], Apos[i]]}
          color={"#CD1818"}
          key={"enemie: " + i}
        />,
        <AnimeGroup
          args={[0.7, 0.7, 3, 32, 20]}
          pos={[0, 0.25, Apos[i]]}
          color="red"
          key={"enemie: " + i}
          rot={yRot[Math.floor(Math.random() * yRot.length)]}
        />
      ];

      instances.push(enemies[Math.floor(Math.random() * enemies.length)]);
    }

    return instances;
  }, []);

  return <>{instances}</>;
}
