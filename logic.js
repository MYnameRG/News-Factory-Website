const xhttp = new XMLHttpRequest();
const source = "bbc-news";
const api = "aee13f6929c6458e8164dccd6879d417";
var news = document.getElementById('news');
//var tap = 0;

document.getElementById("search").addEventListener("input", function(e) {
    var value1 = document.getElementById("search").value;
    var list = document.getElementsByClassName("list-group-item");
    Array.from(list).forEach(function(element) {
      if(element.innerText.includes(value1.toLowerCase()))
      {
        element.style.display = "inline-block";
      } else
      {
        element.style.display = "none";
      }
    });
  });

document.getElementById('backup').addEventListener('click',function(){
    localStorage.clear();
    removeDOM();
});

const onProgress = function()
{
    var spinner = document.createElement('div');
    spinner.className = 'spinner-border';
    spinner.style.width = '5rem';
    spinner.style.height = '5rem';
    spinner.style.marginTop = '10%';
    spinner.style.marginLeft = '50%';
    spinner.setAttribute('role','status');
    
    var span = document.createElement('span');
    span.className = 'sr-only';
    span.appendChild(document.createTextNode('Loading...'));

    spinner.appendChild(span);
    news.appendChild(spinner);    
};

xhttp.onreadystatechange = function()
{   
    if(this.status == 200 && this.readyState == 4)
    {
        var list = JSON.parse(this.responseText);
        if(Array.isArray(list.articles) && list.articles.length)
        {
            removeDOM();
            createDOM(list.articles);
        }
    }
}

function createDOM(newslist)
{
    //console.log(newslist);
    addToLocalStorage(newslist);
    var count = 0;
    var div = document.createElement('div');
    div.className = 'list-group';
    div.id = 'myList';
    div.setAttribute('role','tablist');

    for(let i=0; i<newslist.length; i++)
    {
        var a = document.createElement('a');
        a.className = 'list-group-item list-group-item-action list-group-item-dark';
        a.setAttribute('data-toggle','list');
        a.setAttribute('role','tab');
        a.href = `${newslist[i].url}`;
        a.style.backgroundImage = `url(${newslist[i].urlToImage})`;
        //a.setAttribute('role','button');
        //a.setAttribute('onclick','display()');
        a.style.margin = '10px';
        a.style.fontVariant = 'small-caps';
        a.style.fontWeight = 'bold';
        a.style.color = 'red';
        a.appendChild(document.createTextNode(`Breaking News ${count+1} : ${newslist[i].title}`));
        
        /*var div = document.createElement('div');
        div.id = `${count+1}`;
        div.style.display = 'block';
        div.appendChild(document.createTextNode(`${newslist[i].description}`));
        a.appendChild(div);*/

        div.appendChild(a);

        count++;
    }
    news.appendChild(div);
}

function addToLocalStorage(newslist)
{
    var list = JSON.stringify(newslist);
    localStorage.setItem('newsItem',list);
}

function fromLocalStorage()
{
    //if(localStorage.getItem('newslist') == null) return;
    var get = localStorage.getItem('newsItem');
    var arr = JSON.parse(get);

    var count = 0;
    var div = document.createElement('div');
    div.className = 'list-group';
    div.id = 'myList';
    div.setAttribute('role','tablist');

    for(let i=0; i<arr.length; i++)
    {
        var a = document.createElement('a');
        a.className = 'list-group-item list-group-item-action list-group-item-dark';
        a.setAttribute('data-toggle','list');
        a.setAttribute('role','tab');
        a.href = `${arr[i].url}`;
        a.style.backgroundImage = `url(${arr[i].urlToImage})`;
        //a.setAttribute('role','button');
        //a.setAttribute('onclick','display()');
        a.style.margin = '10px';
        a.style.fontVariant = 'small-caps';
        a.style.fontWeight = 'bold';
        a.style.color = 'red';
        a.appendChild(document.createTextNode(`Breaking News ${count+1} : ${arr[i].title}`));
        
        /*var div = document.createElement('div');
        div.id = `${count+1}`;
        div.style.display = 'block';
        div.appendChild(document.createTextNode(`${newslist[i].description}`));
        a.appendChild(div);*/

        div.appendChild(a);

        count++;
    }
    news.appendChild(div);
}

/*function display()
{
    var x = event.target.parentNode;
    if(x.style.display === 'none')
    {
        x.style.display = 'block';
    }
    else
    {
        x.style.display = 'none';
    }
}*/

function removeDOM()
{
    var child = news.lastElementChild;
    while(child)
    {
        news.removeChild(child);
        child = news.lastElementChild;
    }
}

document.getElementById('search').addEventListener('click',function(e){
    e.preventDefault();
});

document.getElementById('find').addEventListener('click', function(){
    //if(tap >= 1) return;
    xhttp.open("GET",`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${api}`,true);
    onProgress();
    xhttp.send();
    //tap++;
});