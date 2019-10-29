
// Создаем кастомный элемент для простого значения MyLeaf:
class MyLeaf extends HTMLElement {
  constructor() {
    super();
	
  }
  
	connectedCallback() {		
		// Создание shadow root
		let shadow = this.attachShadow({mode: 'open'});
		let container = document.createElement('div');
		let span_attr_name = document.createElement('span');
		let span_attr_val = document.createElement('span');
		let attr_name = this.getAttribute("attr_name");
		let attr_val = this.getAttribute("attr_val");
		container.style.padding = "0 0 0 20px";
		// если именем атрибута не является массив (0)
		if(attr_name != '0' ){
			span_attr_name.textContent = attr_name + ' : ';
		}
		// проставляем значение атрибута
		span_attr_val.textContent = attr_val;
		// добавляем тег с именем атрибута в контейнер
		container.appendChild(span_attr_name);
		// если переданы дочерние теги 
		if(this.custom_child){
			span_attr_val.appendChild(this.custom_child);
		}
		// добавляем тег со значением 
		container.appendChild(span_attr_val);
		// добавляем контейнер в теневой дом
		shadow.appendChild(container);		
	}
}
// Активируем новый кастоный элемент
customElements.define('my-leaf', MyLeaf);
// Создаем кастомный элемент для корня значения MyTree:
class MyTree extends HTMLElement {
	constructor() {
		super();
	}
  
	connectedCallback() {
		let shadow = this.attachShadow({mode: 'open'});
		// проверяем тип переданного объекта 
		// если строка или объект, то ок
		if(typeof(this.tree_object) == 'string' || typeof(this.tree_object) == 'object'){
			// если тип строка, то пробуем преобразовать в объект
			if(typeof(this.tree_object) == 'string'){
				this.tree_object = JSON.parse(this.tree_object);
			}
			let genTree = (inObj) => {
				// генерим дерево
				let tree_root = document.createElement('div');
				// пробегаемся по каждому значению во вхлдящем объекте
				for(var item in inObj){
					// создаем LI
					let li =  document.createElement('my-leaf');
					li.setAttribute("attr_name", item);
					// если тип текущего элемента - объект
					if(typeof(inObj[item]) === 'object'){
						// перезапускаем функцию для объекта и добавляем результат в кастомную переменную для дочек
						li.custom_child = genTree(inObj[item]);
					}else{		
						// иначе просто пишем значние в LI 
						li.setAttribute("attr_val", inObj[item]);
					}
					// добавляем получившийся LI в tree_root
					tree_root.appendChild(li);
				}
				return tree_root;
			}	
			let tree = genTree(this.tree_object);
			shadow.appendChild(tree);
		// иначе ошибка
		}else{
			throw("Invalid data type in tree_object attribute! It must be object or JSON-string with object inside! Got " + this.tree_object);
		}
	}
}
// Активируем новый кастоный элемент
customElements.define('my-tree', MyTree);
// чистим документ, дабы глаза не страдали
document.body.innerHTML = "";
// создаем дерево
var myTreeElement = document.createElement('my-tree');
// закидываем в него объект в виде JSON-строки
myTreeElement.tree_object = `{
	"id": 1,
	"sss": 321,
	"items": [{
		"id": 2,
		"items": [{ 
			"id": 3,
			"objects": [{
				"id": 2,
				"items": [{ 
					"id": 3  
					,"some_param": [{
						"some_param_sub1" : "some_param_sub1",
						"some_param_sub2" : "some_param_sub2"
						
					}]
				}]
			}]
		}]
	}]
}`;

// добавляем в документ
document.body.appendChild(myTreeElement);

// создаем дерево для полноценного объекта 
var myTreeElement_object = document.createElement('my-tree');
// закидываем в него объект в виде объекта
myTreeElement_object.tree_object =  {
	"id": 1,
	"sss": 321,
	"items": [{
		"id": 2,
		"items": [{ 
			"id": 3,
			"some_param": [{
				"some_param_sub1" : "some_param_sub1",
				"some_param_sub2" : "some_param_sub2"
				
			}],
			"objects": [{
				"id": 2,
				"items": [{ 
					"id": 3  
					,"some_param": [{
						"some_param_sub1" : "some_param_sub1",
						"some_param_sub2" : "some_param_sub2"
						
					}]
				}]
			}]
		}]
	}]
};
// добавляем в документ
document.body.appendChild(myTreeElement_object);