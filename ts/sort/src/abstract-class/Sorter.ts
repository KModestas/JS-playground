export interface Sortable {
  length: number;
  compare(leftIndex: number, rightIndex: number): boolean;
  swap(leftIndex: number, rightIndex: number): void;
}

// Sorter doesn't ever get instantiated iself. It is just used as a blueprint for other classes to inherit its properties and methods
// Sorter can sort anything aslong as child classes pass in their own compare and swap function (dependency inversion) and satify the Sortable interface
export abstract class Sorter {
  // each child class that extends Sorter will eventually have these methods. For example CharactersCollection will call the sort() method below which will invoked these methods that exist on CharactersCollection, however ts does not know this just by looking at this isolated class. ....(LST, comment out these abstract properties and see what happens)
  abstract compare(leftIndex: number, rightIndex: number): boolean;
  abstract swap(leftIndex: number, rightIndex: number): void;
  abstract length: number;

  sort(): void {
    const { length } = this;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.compare(j, j + 1)) {
          this.swap(j, j + 1);
        }
      }
    }
  }
}
