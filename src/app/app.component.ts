import { Component, OnInit } from '@angular/core';
import { RandomizedDepthFirst } from './algorithms/mazeGeneration/RandomizedDepthFirst';
import { BinaryTree } from './algorithms/mazeGeneration/BinaryTree';
import { Helper } from './algorithms/utility/helper';
import { RandomizedKruskal } from "./algorithms/mazeGeneration/RandomizerKruskal's";
import { RandomizedPrim } from './algorithms/mazeGeneration/RandomizedPrim';
import { BreadthFirstSearch } from './algorithms/pathFinder/BreadthFirstSearch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MazeGeneratorAndSolver';

  constructor(
    private randomizedDepthFirst: RandomizedDepthFirst,
    private binaryTree: BinaryTree,
    private randomizedKruskal: RandomizedKruskal,
    private randomizedPrim: RandomizedPrim,
    private breadthFirstSearch: BreadthFirstSearch
  ) {}

  width = 22;

  height = 22;

  animateSpeed = 10;

  isAnimating = false;

  isAlgorithmSet = false;

  length: number[] = [];

  traversalArray: number[][] = [];

  ngOnInit() {
    this.setLength();
  }

  setLength() {
    this.length = Array.from(Array(this.width * this.height).keys());
  }

  resetAll() {
    this.isAlgorithmSet = false;
    this.isAnimating = false;
    this.resetMaze();
  }

  resetMaze() {
    for (let i = 0; i < this.length.length; i++) {
      const boxId = this.length[i];
      const ele = document.getElementById('box' + boxId);
      if (ele !== null) ele.className = 'box';
    }
  }

  setWidth(width: string) {
    this.traversalArray = [];
    this.resetAll();
    this.width = Number(width);
    let el = document.getElementById('maze');

    if (el !== null) {
      el.style.width = this.width * 27 + 'px';
    }

    this.setLength();
  }

  setHeight(height: string) {
    this.traversalArray = [];
    this.resetAll();
    this.height = Number(height);
    this.setLength();
  }

  
  createRandomizedDFSMaze() {
    this.traversalArray = [];
    this.randomizedDepthFirst.createMaze(
      this.width,
      this.height,
      this.traversalArray
    );
    this.isAlgorithmSet = true;
  }

  createBinarySearchMaze() {
    this.traversalArray = [];
    this.binaryTree.createMaze(this.width, this.height, this.traversalArray);
    this.isAlgorithmSet = true;
  }

  createRandomizedKruskalMaze() {
    this.traversalArray = [];
    this.randomizedKruskal.createMaze(
      this.width,
      this.height,
      this.traversalArray
    );
    this.isAlgorithmSet = true;
  }

  createRandomizedPrimsMaze() {
    this.traversalArray = [];
    this.randomizedPrim.createMaze(
      this.width,
      this.height,
      this.traversalArray
    );
    this.isAlgorithmSet = true;
  }


  bfs() {
    let frontier = this.breadthFirstSearch.findPath(0, this.width * this.height - 1, this.traversalArray );
    this.animatePathFinder([], frontier);
  }

  async animatePathFinder(path: number[], bestPath: number[]) {

    for (let i = 0; i < path.length; i++) {

      const node = path[i];
      const domElement = document.getElementById('box' + node);

      if(domElement !== null) {
        domElement.classList.add('boxPath')
      }

      await new Promise((r) => setTimeout(r, this.animateSpeed));
    }

    for (let i = 0; i < bestPath.length; i+=2) {

      const node = bestPath[i];
      const domElement = document.getElementById('box' + node);

      if(domElement !== null) {
        const directionStringArr = Helper.getDirectionStringArr(bestPath[i + 1]);
        console.log(directionStringArr);
        domElement.classList.add(directionStringArr[0] + 'border-collapse-yellow');
        domElement.classList.add(directionStringArr[1] + 'border-collapse-yellow');
      }

      await new Promise((r) => setTimeout(r, this.animateSpeed));
    }
  }

  async animateMazeGeneration() {
    this.resetAll();
    this.isAnimating = true;
    for (let i = 0; i < this.traversalArray.length; i++) {
      const traversal = this.traversalArray[i];

      const fromCell = traversal[0];
      const toCell = traversal[1];
      const direction = traversal[2];

      const directionStringArr = Helper.getDirectionStringArr(direction);

      await new Promise((r) => setTimeout(r, this.animateSpeed));
      if (traversal.length == 4) {
        document
          .getElementById('box' + fromCell)
          ?.classList.add(directionStringArr[0] + 'border-collapse-black');
        await new Promise((r) => setTimeout(r, this.animateSpeed));
        document
          .getElementById('box' + toCell)
          ?.classList.add(directionStringArr[1] + 'border-collapse-black');
      } else {
        document
          .getElementById('box' + fromCell)
          ?.classList.add(directionStringArr[0] + 'border-collapse');
        await new Promise((r) => setTimeout(r, this.animateSpeed));
        document
          .getElementById('box' + toCell)
          ?.classList.add(directionStringArr[1] + 'border-collapse');
      }
    }
    this.isAnimating = false;
  }
}
