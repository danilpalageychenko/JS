//Вам нужно создать объект который описывает новостную рассылку:

// const newsFeed = {
//    _articles: [],
//    _isBusy: false,
//    init(articles) {},
//    addArticle(article, cb) {},
//    removeArticle(article, cb) {},
//    find(functor, cb) {},
//    query(queryString) {}
// };

//_articles - это массив из объектов;

//const article = {
//   title: 'required',
//   content: 'required'
//}

//Поля title и content обязательные и должны быть не пустыми строками;

//_isBusy хранит в себе состояние рассылки, устанавливается следующими методами:
 //  addArticle,
 //  removeArticle,
 //  find;

/*То есть все методы которые имеют в списке аргументов коллбек.
_isBusy - получает значение true в начале работы метода и false в конце работы;

addArticle добавляет новую статью. Коллбек не принимает аргументов.

removeArticle удаляет статью по ссылке. Коллбек выполняется с удаленной записью или с null если запись не была найдена.

find - В случаи если функтор возвращает true да какой либо статьи то find выполняет коллбек с найденной статьей.
   В случае если функтор возвращает false для всех статей, то find выполняет коллбек с null.


query - Производит поиск по статьям, и возвращает отсортированные статьи.

Принцип поиска следующий, нужно подсчитать количество совпавших слов в title и в content. Статья в которой количество совпадений наибольшее всплывает,
статья с наименьшим количеством совпадений тонет. Статьи с одинаковым количеством совпадений тестироваться не будут.
Использовать только уникальные слова из запроса, то есть из строки 'hello hello friend' использовать только hello и friend.
Поиск производить без учета регистра.

Все методы должны проверять флаг _isBusy и в случаи если он установлен в true возвращать false.



Задание высылать на почту тренеру: sergey.zotenko@dev-pro.net 
Тема письма: OpenJS KhNURE - Exam3 - <Name Surname>
Deadline: 23 ноября (четверг) 9:00 AM*/



const newsFeed = {
    _articles: [],
    _isBusy: false,

    init(articles) {
        if (articles !== undefined && Array.isArray(articles)) {  
            this._articles = [];
            let length = articles.length;
            for (let i = 0; i <= length -1 ; i++)
            {
                if (articles[i].title != undefined || articles[i].content != undefined) {
                    this._articles.push(articles[i]);
                }
                else return false;
            }
        }
        else return false;
    },

    addArticle(article, cb) {
        if (this._isBusy || !article || article.title == undefined || article.content == undefined){
            return false
        }
        this._isBusy = true;
        setTimeout(() => {
                let arr = {};
                for (let key in article) {
                    arr[key] = article[key];
                }
                this._articles.push(article);
                this._isBusy = false;  
                cb();    
        },100)
    },
    
    removeArticle(article, cb) {
        if (this._isBusy || article == undefined){
            return false
        }
        this._isBusy = true;
        setTimeout(() => {
            let removed = null;
            for (let arr in this._articles) {
                if (this._articles[arr] === article) {
                    removed = this._articles.splice(arr, 1)[0];
                    break; 
                }
            }
            this._isBusy = false;
            return cb(removed);
        },100);
    },

    find(functor, cb) {
        if (this._isBusy || cb == undefined || typeof functor != "function"){
            return false
        }
        this._isBusy = true; 
        setTimeout(()=>{           
            let find = this._articles.find(functor)
			if (find) {
                this._isBusy = false
                cb(find)
            }
            else {
                this._isBusy = false
                cb(null)
            }
        },100);
    },

// query(queryString) {  
//             if (typeof queryString != "string" && queryString == undefined){
//                 return false;
//             }
    
//             function onlyUnique(value, index, self) {
//                 self[index] == [] ? delete self[index] : self[index];
//                 return self.indexOf(value) === index;
//             } 
//             let regExp = new RegExp(queryString.split(/\W+/gi).filter(onlyUnique).join('|'), 'gi');
//             regExp = regExp == "/(?:)/gi" ? '/ /gi' : regExp
//             let leng = 0; 
//             let article = this._articles;
//             if (article.length == 1 && (((article[0].title.split(' ') + ',' + 
//             (article[0].content.split(' '))).match(regExp)) || []).length > 1) {
//                 return article[0];
//             }
//             for (let i = article.length - 1; i > 0; i--){
//                 let counter = 0;     
//                 for (var j = 0; j < i; j++) {;
//                     let arr = ((article[j].title.split(' ') + ',' + 
//                     (article[j].content.split(' '))).match(regExp)) || [];
    
//                     let arr1 = ((article[j + 1].title.split(' ') + ',' + 
//                     (article[j+1].content.split(' '))).match(regExp)) || [];
    
//                     if (arr1 == 0 && article[j + 1].title != '') {
//                         article[j + 1] = {title : '', content : ''}; 
//                         leng ++;
//                     }
//                     else if (arr == 0 && article[j].title != '') {
//                         article[j] = {title : '', content : ''};            
//                         leng ++;
//                     }
//                     if (arr.length < arr1.length) {
//                             let tmp = article[j];
//                             article[j] = article[j + 1];
//                             article[j + 1] = tmp;
//                             counter++;
//                     }
//                 }
//                 if(counter == 0){
//                     break;
//                 }
//             }
//             article.splice(article.length - (leng + 1 == article.length? article.length : leng));
//             if (article) return article;
//             else return false;   
//        }
//     };
//Выше сортировка на базе сортировки пузырьком(рабочая)! 

    query(queryString) {  
        if (typeof queryString != "string" && queryString == undefined){
            return false;
        }

        function onlyUnique(value, index, self) {
            self[index] == [] ? delete self[index] : self[index];
            return self.indexOf(value) === index;
        };
        let regExp = new RegExp(queryString.split(/\W+/gi).filter(onlyUnique).join('|'), 'gi');
        regExp = regExp == "/(?:)/gi" ? '/ /gi' : regExp

        let result = [];    
        let counter = [];
        let totalCounter = 0;
        for (articl in this._articles) {
            counter[articl] = {index : articl , res : ((this._articles[articl].title.split(' ') + ',' + 
                (this._articles[articl].content.split(' '))).match(regExp) || []).length}; 
            totalCounter += counter[articl].res;
        }

        if (totalCounter == 0) return [];
        counter.sort((a,b) => {return b.res - a.res});
        for (let i=0; i<this._articles.length-1;i++) {
            if (counter[i].res != 0)
            {
                result.push(this._articles[counter[i].index]);  
            }
        } 
       return result;
    }
};

const ProjectModule  = (function() {
    let instance;
    function createInstance() {
        return copy = Object.assign({}, newsFeed);
    }
    // function createInstance() {
    //     return obj = project;
    // }
    return {
        getInstance: function () {
            return instance || (instance = createInstance());
        }
    };
})();


/* реализация */
module.exports = {
    firstName: 'Danil',
    lastName: 'Palageychenko',
    task: ProjectModule
}
