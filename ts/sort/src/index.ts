import { Sorter } from './abstract-class/Sorter';
import { Numbers } from './child-classes/Numbers';
import { Characters } from './child-classes/Characters';
import { LinkedList } from './child-classes/LinkedList';

// const Numbers = new Numbers([50, 3, -5, 0]);
// Numbers.sort();
// console.log(Numbers.data);

// const Characters = new Characters('Xaayb');
// Characters.sort();
// console.log(Characters.data);

const linkedList = new LinkedList();
linkedList.add(500);
linkedList.add(-10);
linkedList.add(-3);
linkedList.add(4);

linkedList.sort();
linkedList.print();
