
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
// 导入dat.gui
import * as dat from "dat.gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// 导入fbx
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { Object3D, Sphere, Sprite, Vector3 } from "three";
import { LensflareElement, Lensflare } from 'three/examples/jsm/objects/Lensflare';

var info; 
var infoGroup1 = [];
var infoGroup2 = [];
var infoGroup3 = [];
var infoGroup4 = [];
var infoGroup5 = [];
var infoGroup6 = [];
var infoGroup7 = [];
var infoGroup8 = [];
var infoGroup9 = [];
var infoGroup10 = [];

function initInfo(infoGroup,name,left,top,fontSize){
  info = document.getElementById(name);
  info.style.position = 'absolute';
  info.style.left = left;
  info.style.top = top;
  info.style.display = 'none';
  info.style.fontSize = fontSize;
  infoGroup.push(info);
}
initInfo(infoGroup1,'prompt_msg','150px','200px','30px');

initInfo(infoGroup2,'group1info1','270px','200px','30px');
initInfo(infoGroup2,'group1info2','100px','240px','20px');
initInfo(infoGroup2,'group1info3','100px','280px','20px');
initInfo(infoGroup2,'group1info4','100px','320px','20px');
initInfo(infoGroup2,'group1info5','100px','360px','20px');
initInfo(infoGroup2,'group1info6','100px','400px','20px');
initInfo(infoGroup2,'group1info7','100px','440px','20px');
initInfo(infoGroup2,'group1info8','100px','480px','20px');

initInfo(infoGroup3,'group2info1','300px','200px','30px');
initInfo(infoGroup3,'group2info2','100px','240px','20px');
initInfo(infoGroup3,'group2info3','100px','280px','20px');
initInfo(infoGroup3,'group2info4','100px','320px','20px');
initInfo(infoGroup3,'group2info5','100px','360px','20px');
initInfo(infoGroup3,'group2info6','100px','400px','20px');

initInfo(infoGroup4,'group3info1','270px','200px','30px');
initInfo(infoGroup4,'group3info2','100px','240px','20px');
initInfo(infoGroup4,'group3info3','100px','280px','20px');
initInfo(infoGroup4,'group3info4','100px','320px','20px');
initInfo(infoGroup4,'group3info5','100px','360px','20px');
initInfo(infoGroup4,'group3info6','100px','400px','20px');

initInfo(infoGroup5,'group4info1','300px','200px','30px');
initInfo(infoGroup5,'group4info2','100px','240px','20px');
initInfo(infoGroup5,'group4info3','100px','280px','20px');
initInfo(infoGroup5,'group4info4','100px','320px','20px');
initInfo(infoGroup5,'group4info5','100px','360px','20px');
initInfo(infoGroup5,'group4info6','100px','400px','20px');
initInfo(infoGroup5,'group4info7','100px','440px','20px');

initInfo(infoGroup6,'group5info1','300px','200px','30px');
initInfo(infoGroup6,'group5info2','100px','240px','20px');
initInfo(infoGroup6,'group5info3','100px','280px','20px');
initInfo(infoGroup6,'group5info4','100px','320px','20px');
initInfo(infoGroup6,'group5info5','100px','360px','20px');
initInfo(infoGroup6,'group5info6','100px','400px','20px');

initInfo(infoGroup7,'group6info1','300px','200px','30px');
initInfo(infoGroup7,'group6info2','100px','240px','20px');
initInfo(infoGroup7,'group6info3','100px','280px','20px');
initInfo(infoGroup7,'group6info4','100px','320px','20px');
initInfo(infoGroup7,'group6info5','100px','360px','20px');
initInfo(infoGroup7,'group6info6','100px','400px','20px');

initInfo(infoGroup8,'group7info1','300px','200px','30px');
initInfo(infoGroup8,'group7info2','100px','240px','20px');
initInfo(infoGroup8,'group7info3','100px','280px','20px');
initInfo(infoGroup8,'group7info4','100px','320px','20px');
initInfo(infoGroup8,'group7info5','100px','360px','20px');

initInfo(infoGroup9,'group8info1','300px','200px','30px');
initInfo(infoGroup9,'group8info2','100px','240px','20px');
initInfo(infoGroup9,'group8info3','100px','280px','20px');
initInfo(infoGroup9,'group8info4','100px','320px','20px');
initInfo(infoGroup9,'group8info5','100px','360px','20px');
initInfo(infoGroup9,'group8info6','100px','400px','20px');

initInfo(infoGroup10,'group9info1','300px','200px','30px');
initInfo(infoGroup10,'group9info2','100px','240px','20px');
initInfo(infoGroup10,'group9info3','100px','280px','20px');
initInfo(infoGroup10,'group9info4','100px','320px','20px');
initInfo(infoGroup10,'group9info5','100px','360px','20px');






// 右上角控制器
const gui = new dat.GUI();

const canvas = document.getElementById('main');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//绘制句柄的准备如下/*renderer*/
var renderer = new THREE.WebGLRenderer({ canvas,antialias: true, alpha: true });
//renderer.shadowMap.enabled = true; //辅助线
renderer.shadowMapSoft = true; //柔和阴影
renderer.physicallyCorrectLights = true;
renderer.setClearColor(0xffffff, 1);
//创建场景和摄像机
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1 ,1000);
camera.position.set(500,0,0);//摄像机位置
camera.lookAt(new THREE.Vector3(0,0,0));//看向远点
scene.add(camera);

const light = new THREE.AmbientLight( 0xffffff, 1 ); // soft white light
scene.add( light );
const hemisphereLight = new THREE.HemisphereLight(
   0xffffff,
   0x444444,
   1
 );
 scene.add(hemisphereLight);

 // 创建轨道控制器

const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

// 添加坐标轴辅助器
/*const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);*/
	

function render() {
  controls.update();

  setTimeout(()=>{
    renderer.render(scene,camera)
  },20)
  
	
 
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  
  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});




var raycaster = new THREE.Raycaster();
var pointer = new THREE.Vector2();

var progress = 0;
var cameraPathIndex = 0;

var cameraCurve = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z),
    new THREE.Vector3(250, 0, 0)
  ],
)      

const point = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);


var rotateFlag = true;



let interactPoint = [];
const interactGeometry1 = new THREE.SphereGeometry( 8, 15, 16 );
const interactMaterial1 = new THREE.MeshPhongMaterial( { color: 0xffff00, opacity:1,transparent:true,emissive:0xffff00} );

const sphere1 = new THREE.Mesh( interactGeometry1, interactMaterial1 );
sphere1.position.set(70,100,5);
interactPoint.push(sphere1);

const sphere2 = new THREE.Mesh( interactGeometry1, interactMaterial1 );
sphere2.position.set(70,-10,-10);
interactPoint.push(sphere2);

const sphere3 = new THREE.Mesh( interactGeometry1, interactMaterial1 );
sphere3.position.set(70,-85,40);
interactPoint.push(sphere3);

const sphere4 = new THREE.Mesh( interactGeometry1, interactMaterial1 );
sphere4.position.set(70,-120,60);
interactPoint.push(sphere4);

const sphere5 = new THREE.Mesh( interactGeometry1, interactMaterial1 );
sphere5.position.set(70,0,-50);
interactPoint.push(sphere5);

const sphere6 = new THREE.Mesh( interactGeometry1, interactMaterial1 );
sphere6.position.set(70,-20,-70);
interactPoint.push(sphere6);

const sphere7 = new THREE.Mesh( interactGeometry1, interactMaterial1 );
sphere7.position.set(70,-50,5);
interactPoint.push(sphere7);


const sphere8 = new THREE.Mesh( interactGeometry1, interactMaterial1 );
sphere8.position.set(70,-65,20);
interactPoint.push(sphere8);

const sphere9 = new THREE.Mesh( interactGeometry1, interactMaterial1 );
sphere9.position.set(70,-95,10);
interactPoint.push(sphere9);





var lightProgress = 1;
var lightOver = false;

function interactLight(){
  requestAnimationFrame(interactLight);
  for(var i = 0; i < interactPoint.length; i++){
    if(!lightOver){
      interactPoint[i].material.opacity = lightProgress;
      lightProgress -= 0.001;
      if(lightProgress < 0.1){
        lightOver = true;
      }
    }else{
      interactPoint[i].material.opacity = lightProgress
      lightProgress += 0.001;
      if(lightProgress > 0.5){
        lightOver = false;
      }
    }
  }

 
}

interactLight();


var group = new THREE.Object3D();
var stomach = new THREE.Object3D();

var mesh = new THREE.Mesh();
let rotateObj = [];
var rotateOver = false;
// 导入模型
const fbxLoader = new FBXLoader();
const path = require('../../public/stomach.fbx');
const obj1 = fbxLoader.load(
  path,
  function (object) {
    
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
          child.material.side = THREE.DoubleSide;
      }
    });


    mesh = object.children[0].clone();
    
    const textureLoader = new THREE.TextureLoader();
    var imgPath = require('../assets/images/1.jpg');
    const textureNormal = textureLoader.load(imgPath,function(){
      renderer.render(scene,camera);
    });
    mesh.material.emissive = new THREE.Color(1, 1, 1);
    mesh.material.emissiveIntensity = 1;
    mesh.material.map = textureNormal;
    mesh.material.emissiveMap = mesh.material.map;
    mesh.position.set(0,0,0);
    mesh.name = 'stomach';
    //console.log(mesh)
    scene.add(mesh);

    

    function changePivot(obj){
      let center = new THREE.Vector3();
      obj.geometry.computeBoundingBox();
      obj.geometry.boundingBox.getCenter(center);
      let wrapper = new THREE.Object3D();
      wrapper.position.set(center.x, center.y, center.z);
      obj.position.set(-center.x, -center.y, -center.z);
      wrapper.add(obj);
      scene.add(wrapper);
      return wrapper;
    }
   
    //加载外部模型成功后，筛选出需要选择的物体，并且存入数组。
    scene.children.forEach(item => {
      if (item.name.includes('stomach')) {
        rotateObj.push(changePivot(item))
      }
    })

    function rotateFbx(){
      
      if (rotateObj) {
        rotateObj.forEach(item => {
         
           item.rotation.y += 0.005;
           if(item.rotation.y > Math.PI*2){
            item.rotation.y = 0;
           }
          
        })
      }
     
    }

  
    function rotateStop(){
      
      if(!rotateFlag){
        if (rotateObj) {
          rotateObj.forEach(item => {
            if(item.rotation.y <= Math.PI*2){
              item.rotation.y+=0.1;
            }else{
              rotateOver = true;
              for(var i = 0; i < interactPoint.length; i++)scene.add(interactPoint[i]);
              for(var i = 0; i < infoGroup1.length; i++)infoGroup1[i].style.display = 'block';
            }
          })
          
      }
        
      }
  
    }

   

    function move(){
      requestAnimationFrame(move);
      if(rotateFlag){
        rotateFbx();
      }
      if(!rotateOver)rotateStop();
    }

    move();

    function click(event){
      pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      // update the picking ray with the camera and pointer position
      raycaster.setFromCamera( pointer, camera );

      // calculate objects intersecting the picking ray
      var intersects = raycaster.intersectObjects(scene.children);
      
      if(intersects.length > 0){
        
          //console.log(intersects, 'intersects');
          //console.log(mesh.name);
          //console.log(group);
          //console.log(rotateObj[0].name);
          rotateFlag = false;
          
          
        clear_info_opa();
          if(intersects[0].object == sphere1){
            console.log(1);
            for(var i = 0; i< infoGroup2.length; i++)infoGroup2[i].style.display = 'block';
            }else if(intersects[0].object == sphere2){
            console.log(2);
            for(var i = 0; i< infoGroup3.length; i++)infoGroup3[i].style.display = 'block';
          }else if(intersects[0].object == sphere3){
            console.log(3);
            for(var i = 0; i< infoGroup4.length; i++)infoGroup4[i].style.display = 'block';
          }else if(intersects[0].object == sphere4){
            console.log(4);
            for(var i = 0; i< infoGroup5.length; i++)infoGroup5[i].style.display = 'block';
          }else if(intersects[0].object == sphere5){
            console.log(5);
            for(var i = 0; i< infoGroup6.length; i++)infoGroup6[i].style.display = 'block';
          }else if(intersects[0].object == sphere6){
            console.log(6);
            for(var i = 0; i< infoGroup7.length; i++)infoGroup7[i].style.display = 'block';
          }else if(intersects[0].object == sphere7){
            console.log(7);
            for(var i = 0; i< infoGroup8.length; i++)infoGroup8[i].style.display = 'block';
          }else if(intersects[0].object == sphere8){
            console.log(8);
            for(var i = 0; i< infoGroup9.length; i++)infoGroup9[i].style.display = 'block';
          }else if(intersects[0].object == sphere9){
            console.log(9);
            for(var i = 0; i< infoGroup10.length; i++)infoGroup10[i].style.display = 'block';
          }
      }
    }

    
    
    
    window.addEventListener('click', click);
    window.requestAnimationFrame(click);

   
  }
)

function cameraMove(){
	      
	// if(progress >= 0.5){
	// 	// const pointBox = new THREE.Vector3(point.x * (progress - 0.0005*10), point.y* (progress - 0.0005*10), point.z* (progress - 0.0005*10));
	// 	// camera.position.set(pointBox.x, pointBox.y, pointBox.z);
	// 	// progress -= 0.0005*10;
    

	// }
  if (cameraPathIndex < 500) {
    requestAnimationFrame(cameraMove);     
    cameraPathIndex += 5;
  }
  const curveIndex = cameraPathIndex / 1000;
  
  //取相机路径上当前点的坐标
  const tmpCameraPosition = new Vector3(cameraCurve.getPointAt(curveIndex).x, cameraCurve.getPointAt(curveIndex).y, cameraCurve.getPointAt(curveIndex).z) //curveIndex取值0~1
  //设置相机坐标为在相机路径上当前点的位置
  camera.position.set(
    tmpCameraPosition.x,
    tmpCameraPosition.y,
    tmpCameraPosition.z
  )
  controls.enabled = false;

  camera.lookAt(new THREE.Vector3(0, 0, 0)) //相机看向原点

}

function clear_info_opa(){
    for(var i = 0; i< infoGroup1.length; i++)infoGroup1[i].style.display = 'none'; 
    for(var i = 0; i< infoGroup2.length; i++)infoGroup2[i].style.display = 'none';
    for(var i = 0; i< infoGroup3.length; i++)infoGroup3[i].style.display = 'none';
    for(var i = 0; i< infoGroup4.length; i++)infoGroup4[i].style.display = 'none';
    for(var i = 0; i< infoGroup5.length; i++)infoGroup5[i].style.display = 'none';
    for(var i = 0; i< infoGroup6.length; i++)infoGroup6[i].style.display = 'none';
    for(var i = 0; i< infoGroup7.length; i++)infoGroup7[i].style.display = 'none';
    for(var i = 0; i< infoGroup8.length; i++)infoGroup8[i].style.display = 'none';
    for(var i = 0; i< infoGroup9.length; i++)infoGroup9[i].style.display = 'none';
    for(var i = 0; i< infoGroup10.length; i++)infoGroup10[i].style.display = 'none';
}

var buttonFunction = new function(){
  this.cameraInit = function(){
    function cameraInitFunction(){
      if(cameraPathIndex > 0){
        requestAnimationFrame(cameraInitFunction);
        cameraPathIndex -=5;
      }
      const curveIndex = cameraPathIndex / 1000;

      const tmpCameraPosition = new Vector3(cameraCurve.getPointAt(curveIndex).x, cameraCurve.getPointAt(curveIndex).y, cameraCurve.getPointAt(curveIndex).z) //curveIndex取值0~1
    //设置相机坐标为在相机路径上当前点的位置
      camera.position.set(
        tmpCameraPosition.x,
        tmpCameraPosition.y,
        tmpCameraPosition.z
      )
      controls.enabled = true;
      rotateFlag = true;   
    }
    rotateOver = false;
    for(var i = 0; i < interactPoint.length; i++)scene.remove(interactPoint[i]);

    clear_info_opa();
    cameraInitFunction();
  
  }
}

gui.add(buttonFunction, 'cameraInit').name("返回预览");

function clickOn(event){
  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera( pointer, camera );

  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(scene.children);
  
  if(intersects.length > 0){
     // console.log(intersects, 'intersects');
      cameraMove();
      // console.log(mesh.name);
      // console.log(group);
      // console.log(rotateObj[0].name);
  }
}

window.addEventListener('click', clickOn);
window.requestAnimationFrame(clickOn);
