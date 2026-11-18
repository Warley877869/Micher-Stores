const express=require("express"),fs=require("fs"),path=require("path"),app=express();
const PORT=process.env.PORT||3000,DB=path.join(__dirname,"data","products.json");
app.use(express.json({limit:"2mb"}));app.use(express.static(path.join(__dirname,"public")));
const read=()=>JSON.parse(fs.readFileSync(DB,"utf8")),write=x=>fs.writeFileSync(DB,JSON.stringify(x,null,2));
// READ
app.get("/api/products",(req,res)=>{let a=read();if(req.query.category&&req.query.category!=="Todos")a=a.filter(x=>x.category===req.query.category);if(req.query.search){let q=req.query.search.toLowerCase();a=a.filter(x=>(x.name+" "+x.category+" "+x.tag).toLowerCase().includes(q));}res.json(a)});
app.get("/api/products/:id",(req,res)=>{let p=read().find(x=>x.id===+req.params.id);p?res.json(p):res.status(404).json({error:"Produto não encontrado"})});
// CREATE
app.post("/api/products",(req,res)=>{let {name,category,price,image,tag}=req.body;if(!name||!category||!Number.isFinite(+price)||+price<=0)return res.status(400).json({error:"Nome, categoria e preço válido são obrigatórios"});let a=read(),p={id:Date.now(),name:String(name).trim(),category,price:+price,image:image||"/assets/look-01.jpg",tag:tag||"NEW DROP"};a.unshift(p);write(a);res.status(201).json(p)});
// UPDATE
app.put("/api/products/:id",(req,res)=>{let a=read(),i=a.findIndex(x=>x.id===+req.params.id);if(i<0)return res.status(404).json({error:"Produto não encontrado"});let p={...a[i],...req.body,id:a[i].id};if(req.body.price!==undefined){if(!Number.isFinite(+req.body.price)||+req.body.price<=0)return res.status(400).json({error:"Preço inválido"});p.price=+req.body.price}a[i]=p;write(a);res.json(p)});
// DELETE
app.delete("/api/products/:id",(req,res)=>{let a=read(),b=a.filter(x=>x.id!==+req.params.id);if(a.length===b.length)return res.status(404).json({error:"Produto não encontrado"});write(b);res.status(204).end()});
app.get("*",(_,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(PORT,()=>console.log(`Micher Store em http://localhost:${PORT}`));