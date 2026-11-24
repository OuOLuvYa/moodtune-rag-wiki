const sections = [...document.querySelectorAll('.wiki-section')];
const navLinks = [...document.querySelectorAll('.sidebar nav a')];
const search = document.querySelector('#search');
const noResults = document.querySelector('#noResults');
const sourceList = document.querySelector('#sourceList');
const backToTop = document.querySelector('#backToTop');

const sources = [
  {id:'S1', title:'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', meta:'Lewis et al. · 2020 · RAG 定義、外部記憶、來源追溯', url:'https://arxiv.org/abs/2005.11401'},
  {id:'S2', title:'Dense Passage Retrieval for Open-Domain Question Answering', meta:'Karpukhin et al. · 2020 · 雙編碼器與密集檢索', url:'https://arxiv.org/abs/2004.04906'},
  {id:'S3', title:'Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks', meta:'Reimers & Gurevych · 2019 · 句向量與餘弦相似度', url:'https://arxiv.org/abs/1908.10084'},
  {id:'S4', title:'Billion-scale similarity search with GPUs', meta:'Johnson, Douze & Jégou · 2017 · Faiss 與近鄰搜尋', url:'https://arxiv.org/abs/1702.08734'},
  {id:'S5', title:'Developing a benchmark for emotional analysis of music', meta:'Aljanaki, Yang & Soleymani · 2017 · 效價、喚醒度與 DEAM', url:'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0173392'},
  {id:'S6', title:'RAGAS: Automated Evaluation of Retrieval Augmented Generation', meta:'Es et al. · 2023 · 檢索相關性、忠實度、回答相關性', url:'https://arxiv.org/abs/2309.15217'}
];

sourceList.innerHTML = sources.map(source => `
  <article class="source-item">
    <div class="source-id">${source.id}</div>
    <div><h3>${source.title}</h3><p>${source.meta}</p><a href="${source.url}" target="_blank" rel="noreferrer">查看原始資料</a></div>
  </article>`).join('');

const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === visible.target.id));
}, {rootMargin:'-20% 0px -65% 0px', threshold:[0,.25,.6]});
sections.forEach(section => observer.observe(section));

search.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase();
  let found = 0;
  sections.forEach(section => {
    const matches = !query || section.textContent.toLowerCase().includes(query);
    section.hidden = !matches;
    if (matches) found += 1;
  });
  noResults.hidden = found !== 0;
});

window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 650), {passive:true});
backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

