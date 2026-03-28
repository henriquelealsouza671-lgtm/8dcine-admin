import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { 
  Film, Tv, FolderTree, Users, BarChart3, FileText, Settings, Wrench, 
  CheckCircle2, Server, Star, ChevronRight, Search, ArrowLeft, Plus, 
  Trash2, Video, Tag, ShieldBan, CheckCircle 
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="min-h-screen p-6 max-w-screen-2xl mx-auto select-none">
      
      {/* HEADER GLOBAL */}
      <header className="flex justify-between items-center mb-8 bg-[#232533] p-5 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] border border-[#32364a]">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
          <div className="w-12 h-12 bg-gradient-to-b from-gray-600 to-gray-900 rounded-full border-2 border-gray-500 shadow-inner flex items-center justify-center font-black text-2xl text-gray-300 drop-shadow-md">
            8D
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-gray-100 drop-shadow-md uppercase italic">
            Cine <span className="text-gray-400 font-medium normal-case tracking-normal">Admin</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 bg-black/30 p-2 pl-4 rounded-full border border-white/5 shadow-inner">
          <img src="https://api.dicebear.com/8.x/avataaars/svg?seed=admin" className="w-9 h-9 rounded-full bg-gray-700 border border-gray-500 shadow-sm" />
          <div className='flex flex-col pr-2'>
            <span className="text-sm font-bold text-gray-100">Henrique Leal</span>
            <span className="text-[10px] text-green-400 font-medium tracking-wide">Administrator</span>
          </div>
        </div>
      </header>

      {/* RENDERIZAÇÃO DAS TELAS */}
      {currentView === 'dashboard' && <DashboardView onNavigate={setCurrentView} />}
      {currentView === 'movies' && <MovieManagerView onNavigate={setCurrentView} />}
      {currentView === 'series' && <SeriesManagerView onNavigate={setCurrentView} />}
      {currentView === 'categories' && <CategoryManagerView onNavigate={setCurrentView} />}
      {currentView === 'users' && <UserManagerView onNavigate={setCurrentView} />}
      {currentView === 'maintenance' && <MaintenanceView onNavigate={setCurrentView} />}
      {currentView === 'settings' && <SettingsView onNavigate={setCurrentView} />}
      {currentView === 'settings' && <SettingsView onNavigate={setCurrentView} />}
      {currentView === 'analytics' && <AnalyticsView onNavigate={setCurrentView} />}
      <footer className="mt-16 text-center text-gray-600 text-[10px] py-6 border-t border-[#32364a]">
        8D Cine Admin v2.0 | Engine 3D | &copy; 2026 Henrique Leal Projects
      </footer>
    </div>
  );
}

/* =========================================
   ECRÃ 1: DASHBOARD (Completo e Dinâmico)
========================================= */
function DashboardView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [recentes, setRecentes] = useState<any[]>([]);
  const [stats, setStats] = useState({ filmes: 0, series: 0, categorias: 0, usuarios: 0 });

  useEffect(() => {
    const carregarDadosDoPainel = async () => {
      // 1. Busca os 4 últimos filmes reais do seu banco (usando ID já que não tínhamos a data)
      const { data: filmes } = await supabase.from('filmes').select('*').order('id', { ascending: false }).limit(4);
      if (filmes) setRecentes(filmes);

      // 2. Conta os totais reais para os gráficos
      const { count: cFilmes } = await supabase.from('filmes').select('*', { count: 'exact', head: true });
      const { count: cSeries } = await supabase.from('series').select('*', { count: 'exact', head: true });
      const { count: cCat } = await supabase.from('categorias').select('*', { count: 'exact', head: true });
      const { count: cUser } = await supabase.from('perfis').select('*', { count: 'exact', head: true });

      setStats({
        filmes: cFilmes || 0,
        series: cSeries || 0,
        categorias: cCat || 0,
        usuarios: cUser || 0
      });
    };
    carregarDadosDoPainel();
  }, []);

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      
      {/* BOTÕES DE AÇÃO RÁPIDA */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-6 text-gray-300 flex items-center gap-2">Painel Principal</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-5">
          <div onClick={() => onNavigate('movies')}><Botao3D icon={<Film size={36} />} title="Gerir Filmes" subtitle="Catálogo" /></div>
          <div onClick={() => onNavigate('series')}><Botao3D icon={<Tv size={36} />} title="Gerir Séries" subtitle="Catálogo TV" /></div>
          <div onClick={() => onNavigate('categories')}><Botao3D icon={<FolderTree size={36} />} title="Categorias" subtitle="Hubs 8D" cor="from-yellow-600 to-yellow-800" /></div>
          <div onClick={() => onNavigate('users')}><Botao3D icon={<Users size={36} />} title="Utilizadores" subtitle="Acessos" cor="from-blue-600 to-blue-800" /></div>
          
         <div onClick={() => onNavigate('analytics')}>
            <Botao3D icon={<BarChart3 size={36} />} title="Estatísticas" subtitle="Analytics" cor="from-orange-600 to-orange-800" />
          </div>
          <div onClick={() => onNavigate('analytics')}>
            <Botao3D icon={<FileText size={36} />} title="Relatórios" subtitle="Reports" cor="from-purple-600 to-purple-800" />
          </div>
          
          <div onClick={() => onNavigate('settings')}>
            <Botao3D icon={<Settings size={36} />} title="Definições" subtitle="App Settings" />
          </div>
          
          <div onClick={() => onNavigate('maintenance')}>
            <Botao3D icon={<Wrench size={36} />} title="Manutenção" subtitle="Sistema" cor="from-red-700 to-red-900" />
          </div>
        </div>
      </section>

      {/* DIVISÃO DE COLUNAS: ESQUERDA (Stats/Filmes) e DIREITA (Servidor) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 mb-10">
        
        {/* LADO ESQUERDO: Ocupa 2 colunas */}
        <div className="xl:col-span-2 space-y-10">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <StatCard title="Filmes" value={stats.filmes} subtitle="Registados" color="from-[#d96621] to-[#a64b14]" icon={<Film size={18}/>} />
            <StatCard title="Séries" value={stats.series} subtitle="Registadas" color="from-[#794b9e] to-[#512c70]" icon={<Tv size={18}/>} />
            <StatCard title="Categorias" value={stats.categorias} subtitle="Hubs Ativos" color="from-[#b48600] to-[#805f00]" icon={<FolderTree size={18}/>} />
            <StatCard title="Utilizadores" value={stats.usuarios} subtitle="Contas" color="from-[#2170b5] to-[#124b7d]" icon={<Users size={18}/>} />
          </div>

          <section>
            <h2 className="text-xl font-bold mb-6 text-gray-300 border-b border-[#32364a] pb-2">Últimos Filmes Adicionados</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               {recentes.length === 0 ? (
                  <p className="text-gray-500 text-sm col-span-4">Nenhum filme adicionado ainda.</p>
               ) : (
                 recentes.map(filme => (
                    <DashboardMovieCard key={filme.id} title={filme.titulo} genre={filme.categoria || "Sem Categoria"} year={filme.ano || "---"} img={filme.poster_url} />
                 ))
               )}
            </div>
          </section>

        </div>

        {/* LADO DIREITO: Ocupa 1 coluna (Servidor) */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-6 text-gray-300 border-b border-[#32364a] pb-2">Status do Servidor</h2>
          
          <div className="bg-gradient-to-b from-[#2b2d3d] to-[#1d1f2b] p-5 rounded-lg border border-[#3a3e52] shadow-[0_5px_15px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] flex items-center gap-5">
            <div className="bg-green-500 rounded-full p-1 shadow-[0_0_15px_rgba(34,197,94,0.6)]">
              <CheckCircle2 size={30} className="text-white drop-shadow-md" />
            </div>
            <div>
              <p className="font-extrabold text-lg text-gray-100">Servidor Online</p>
              <p className="text-xs text-green-400 font-medium">Supabase Conectado</p>
            </div>
          </div>

          <div className="bg-[#1f212e] p-6 rounded-lg border border-[#2a2d3e] shadow-inner space-y-6 mt-4">
            <ProgressBar label="Uso de CPU (Core)" percentage={28} color="bg-blue-400" />
            <ProgressBar label="Uso de Banda (Stream)" percentage={56} color="bg-orange-400" />
          </div>
        </div>

      </div>
    </div>
  );
}

/* =========================================
   ECRÃ 2: GESTOR DE FILMES
========================================= */
function MovieManagerView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  
  const [videoUrl, setVideoUrl] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const [savedMovies, setSavedMovies] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);

  useEffect(() => {
    fetchSavedMovies();
    fetchCategorias();
  }, []);

 const fetchSavedMovies = async () => {
    // Tirei o .order() daqui. Agora ele puxa os filmes independente de ter coluna de data!
    const { data } = await supabase.from('filmes').select('*');
    if (data) setSavedMovies(data);
  };

  const fetchCategorias = async () => {
    const { data } = await supabase.from('categorias').select('*').order('created_at', { ascending: false });
    if (data) setCategorias(data);
  };

  const searchMovies = async () => {
    if (!query) return;
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      alert("Erro ao pesquisar no TMDB.");
    }
  };

  const handleSaveMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMovie || !videoUrl) return alert("O link do vídeo é obrigatório!");
    
    setIsSaving(true);
    const finalMovieData = {
      tmdb_id: selectedMovie.id,
      titulo: selectedMovie.title,
      sinopse: selectedMovie.overview,
      poster_url: selectedMovie.poster_path ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}` : null,
      video_url: videoUrl,
      ano: selectedMovie.release_date?.split('-')[0] || '',
      categoria: categoriaSelecionada
    };

    const { error } = await supabase.from('filmes').insert([finalMovieData]);
    setIsSaving(false);

    if (error) {
      alert("Erro ao guardar o filme.");
    } else {
      setSelectedMovie(null);
      setVideoUrl('');
      setCategoriaSelecionada('');
      setQuery('');
      setResults([]);
      fetchSavedMovies(); 
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Remover filme do catálogo?")) {
      await supabase.from('filmes').delete().eq('id', id);
      fetchSavedMovies();
    }
  };

  return (
    <div className="animate-in slide-in-from-right-8 duration-300">
      <div className="flex items-center gap-4 mb-8 border-b border-[#32364a] pb-4">
        <button onClick={() => onNavigate('dashboard')} className="p-2 bg-[#2b2d3d] border border-[#3a3e52] shadow-md rounded-lg hover:brightness-110 active:translate-y-px">
          <ArrowLeft size={20} className="text-gray-300" />
        </button>
        <h2 className="text-2xl font-bold text-gray-200 drop-shadow-md">Central de Filmes (TMDB)</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="bg-gradient-to-b from-[#232533] to-[#1c1d29] p-6 rounded-2xl border border-[#32364a] shadow-xl">
          <h3 className="text-lg font-bold text-gray-300 mb-6 flex items-center gap-2"><Search size={18} className="text-blue-500"/> Pesquisar no TMDB</h3>
          
          {!selectedMovie ? (
            <>
              <div className="flex gap-3 mb-6">
                <input 
                  type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && searchMovies()}
                  placeholder="Ex: Matrix, Avengers..."
                  className="flex-1 bg-[#13141c] border border-black shadow-inner rounded-xl p-4 text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button onClick={searchMovies} className="bg-gradient-to-b from-blue-600 to-blue-800 border border-blue-500 rounded-xl px-6 font-bold shadow-md hover:brightness-110 active:translate-y-px">
                  Pesquisar
                </button>
              </div>
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 scrollbar-hide">
                {results.map((movie) => (
                  <div key={movie.id} className="bg-[#2a2c3d] p-3 rounded-xl border border-[#3a3e52] shadow-md flex gap-4 items-center group hover:border-blue-500/50">
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : 'https://via.placeholder.com/92'} className="w-12 h-16 object-cover rounded-md" />
                    <div className="flex-1">
                      <p className="font-bold text-gray-200 text-sm">{movie.title}</p>
                      <p className="text-xs text-gray-400">{movie.release_date?.split('-')[0]}</p>
                    </div>
                    <button onClick={() => setSelectedMovie(movie)} className="bg-gradient-to-b from-green-600 to-green-800 border border-green-500 px-4 py-2 rounded-lg text-xs font-bold hover:brightness-110">
                      Importar
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <form onSubmit={handleSaveMovie} className="bg-[#1f212e] p-6 rounded-xl border border-blue-500/50 shadow-inner space-y-6">
              <div className="flex gap-5">
                 <img src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`} className="w-24 rounded-lg shadow-lg border border-white/10" />
                 <div>
                   <h3 className="text-xl font-bold text-white drop-shadow-md">{selectedMovie.title}</h3>
                   <p className="text-xs text-gray-400 mt-2 line-clamp-4 font-medium leading-relaxed">{selectedMovie.overview}</p>
                 </div>
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-yellow-400 mb-2"><Tag size={16}/> Selecionar Categoria (Hub)</label>
                <select 
                  value={categoriaSelecionada} onChange={(e) => setCategoriaSelecionada(e.target.value)}
                  className="w-full bg-[#13141c] border border-black shadow-inner rounded-xl p-4 text-white font-bold focus:outline-none focus:ring-1 focus:ring-yellow-500 appearance-none"
                >
                  <option value="">Nenhuma / Solto</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.nome}>{cat.icone} {cat.nome}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-blue-400 mb-2"><Video size={16}/> Link de Vídeo (.mp4)</label>
                <input 
                  type="url" required value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full bg-[#13141c] border border-black shadow-inner rounded-xl p-4 text-green-400 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setSelectedMovie(null)} className="flex-1 bg-gradient-to-b from-gray-700 to-gray-900 border border-gray-600 py-3 rounded-xl font-bold hover:brightness-110">
                  Cancelar
                </button>
                <button type="submit" disabled={isSaving} className="flex-[2] bg-gradient-to-b from-blue-600 to-blue-800 border border-blue-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50">
                  <Plus size={18} /> {isSaving ? 'A Guardar...' : 'Guardar no Catálogo'}
                </button>
              </div>
            </form>
          )}
        </section>

        <section className="bg-gradient-to-b from-[#232533] to-[#1c1d29] p-6 rounded-2xl border border-[#32364a] shadow-xl">
          <h3 className="text-lg font-bold text-gray-300 mb-6 flex items-center gap-2">
            <Film size={18} className="text-green-500"/> No Catálogo ({savedMovies.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[550px] overflow-y-auto pr-2 scrollbar-hide">
            {savedMovies.map(movie => (
              <div key={movie.id} className="relative group rounded-xl overflow-hidden border border-[#3a3e52] shadow-lg">
                <img src={movie.poster_url} className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                {movie.categoria && (
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded text-[9px] font-bold text-yellow-400">
                    {movie.categoria}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <p className="text-[11px] font-bold text-white truncate">{movie.titulo}</p>
                  <button onClick={() => handleDelete(movie.id)} className="mt-2 bg-gradient-to-b from-red-600 to-red-800 border border-red-500 text-[10px] py-1.5 rounded-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* =========================================
   ECRÃ 3: GESTOR DE CATEGORIAS
========================================= */
function CategoryManagerView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [nome, setNome] = useState('');
  const [icone, setIcone] = useState('');
  const [categorias, setCategorias] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetchCategorias(); }, []);

  const fetchCategorias = async () => {
    const { data } = await supabase.from('categorias').select('*').order('created_at', { ascending: false });
    if (data) setCategorias(data);
  };

  const handleSaveCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome) return;
    setIsSaving(true);
    const { error } = await supabase.from('categorias').insert([{ nome, icone }]);
    setIsSaving(false);

    if (error) alert("Erro ao guardar categoria.");
    else {
      setNome('');
      setIcone('');
      fetchCategorias();
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Eliminar esta categoria?")) {
      await supabase.from('categorias').delete().eq('id', id);
      fetchCategorias();
    }
  };

  return (
    <div className="animate-in slide-in-from-right-8 duration-300">
      <div className="flex items-center gap-4 mb-8 border-b border-[#32364a] pb-4">
        <button onClick={() => onNavigate('dashboard')} className="p-2 bg-[#2b2d3d] border border-[#3a3e52] shadow-md rounded-lg hover:brightness-110 active:translate-y-px">
          <ArrowLeft size={20} className="text-gray-300" />
        </button>
        <h2 className="text-2xl font-bold text-gray-200 drop-shadow-md flex items-center gap-2">
          <FolderTree className="text-yellow-500" /> Gestor de Categorias
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="bg-gradient-to-b from-[#232533] to-[#1c1d29] p-6 rounded-2xl border border-[#32364a] shadow-xl">
          <h3 className="text-lg font-bold text-gray-300 mb-6 flex items-center gap-2"><Plus size={18} className="text-yellow-500"/> Nova Categoria</h3>
          <form onSubmit={handleSaveCategoria} className="bg-[#1f212e] p-6 rounded-xl border border-yellow-500/50 shadow-inner space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-yellow-400 mb-2">Nome da Categoria</label>
              <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} className="w-full bg-[#13141c] border border-black shadow-inner rounded-xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-yellow-500" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-yellow-400 mb-2">Emoji/Ícone</label>
              <input type="text" value={icone} onChange={(e) => setIcone(e.target.value)} maxLength={2} className="w-24 bg-[#13141c] border border-black shadow-inner rounded-xl p-4 text-2xl text-center text-white focus:outline-none focus:ring-1 focus:ring-yellow-500" />
            </div>
            <button type="submit" disabled={isSaving} className="w-full bg-gradient-to-b from-yellow-600 to-yellow-800 border border-yellow-500 shadow-lg py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110">
              <Plus size={18} /> {isSaving ? 'A Guardar...' : 'Criar Categoria'}
            </button>
          </form>
        </section>

        <section className="bg-gradient-to-b from-[#232533] to-[#1c1d29] p-6 rounded-2xl border border-[#32364a] shadow-xl">
          <h3 className="text-lg font-bold text-gray-300 mb-6 flex items-center gap-2"><FolderTree size={18} className="text-yellow-500"/> Hubs Atuais ({categorias.length})</h3>
          <div className="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
            {categorias.map(cat => (
              <div key={cat.id} className="bg-gradient-to-b from-[#2a2c3d] to-[#1f212e] p-4 rounded-xl border border-[#3a3e52] shadow-md flex justify-between items-center group hover:border-yellow-500/50">
                <div className="flex items-center gap-3"><span className="text-2xl">{cat.icone}</span><span className="font-bold text-gray-200 text-sm">{cat.nome}</span></div>
                <button onClick={() => handleDelete(cat.id)} className="text-red-500 opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* =========================================
   ECRÃ 4: GESTOR DE USUÁRIOS
========================================= */
function UserManagerView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => { fetchUsuarios(); }, []);

  const fetchUsuarios = async () => {
    const { data } = await supabase.from('perfis').select('*').order('created_at', { ascending: false });
    if (data) setUsuarios(data);
  };

  const toggleStatus = async (id: string, statusAtual: string) => {
    const novoStatus = statusAtual === 'ativo' ? 'bloqueado' : 'ativo';
    const acao = novoStatus === 'bloqueado' ? 'bloquear' : 'reativar';
    
    if (window.confirm(`Tem certeza que deseja ${acao} este utilizador?`)) {
      await supabase.from('perfis').update({ status: novoStatus }).eq('id', id);
      fetchUsuarios();
    }
  };

  return (
    <div className="animate-in slide-in-from-right-8 duration-300">
      <div className="flex items-center gap-4 mb-8 border-b border-[#32364a] pb-4">
        <button onClick={() => onNavigate('dashboard')} className="p-2 bg-[#2b2d3d] border border-[#3a3e52] shadow-md rounded-lg hover:brightness-110 active:translate-y-px">
          <ArrowLeft size={20} className="text-gray-300" />
        </button>
        <h2 className="text-2xl font-bold text-gray-200 drop-shadow-md flex items-center gap-2"><Users className="text-blue-500" /> Contas e Acessos</h2>
      </div>

      <section className="bg-gradient-to-b from-[#232533] to-[#1c1d29] p-6 rounded-2xl border border-[#32364a] shadow-xl">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-lg font-bold text-gray-300">Utilizadores Registados ({usuarios.length})</h3>
        </div>
        
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
          {usuarios.length === 0 ? (
            <div className="text-center py-10 text-gray-500 font-medium">Nenhum utilizador registado ainda.</div>
          ) : (
            usuarios.map(user => (
              <div key={user.id} className="bg-gradient-to-b from-[#2a2c3d] to-[#1f212e] p-4 rounded-xl border border-[#3a3e52] shadow-md flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-inner border ${user.status === 'ativo' ? 'bg-blue-900/50 border-blue-500 text-blue-400' : 'bg-red-900/50 border-red-500 text-red-400'}`}>
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-200 text-sm">{user.email}</p>
                    <p className="text-xs text-gray-500">Entrou em: {new Date(user.created_at).toLocaleDateString('pt-PT')}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${user.status === 'ativo' ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
                    {user.status}
                  </span>
                  <button onClick={() => toggleStatus(user.id, user.status)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md active:translate-y-px border ${user.status === 'ativo' ? 'bg-gradient-to-b from-gray-700 to-gray-800 border-gray-600 hover:border-red-500 hover:text-red-400' : 'bg-gradient-to-b from-green-600 to-green-800 border-green-500 text-white hover:brightness-110'}`}>
                    {user.status === 'ativo' ? <><ShieldBan size={14}/> Bloquear</> : <><CheckCircle size={14}/> Reativar</>}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}


/* =========================================
   ECRÃ 5: MODO DE MANUTENÇÃO (O Interruptor)
========================================= */
function MaintenanceView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [isAtivo, setIsAtivo] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    const { data } = await supabase.from('configuracoes').select('*').eq('id', 1).single();
    if (data) {
      setIsAtivo(data.modo_manutencao);
      setMensagem(data.mensagem_manutencao);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const { error } = await supabase.from('configuracoes').update({ 
      modo_manutencao: isAtivo,
      mensagem_manutencao: mensagem
    }).eq('id', 1);
    
    setIsSaving(false);
    if (error) alert("Erro ao salvar configurações.");
    else alert("Configurações do sistema atualizadas!");
  };

  return (
    <div className="animate-in slide-in-from-right-8 duration-300">
      <div className="flex items-center gap-4 mb-8 border-b border-[#32364a] pb-4">
        <button onClick={() => onNavigate('dashboard')} className="p-2 bg-[#2b2d3d] border border-[#3a3e52] shadow-md rounded-lg hover:brightness-110 active:translate-y-px">
          <ArrowLeft size={20} className="text-gray-300" />
        </button>
        <h2 className="text-2xl font-bold text-gray-200 drop-shadow-md flex items-center gap-2">
          <Wrench className="text-red-500" /> Controle de Manutenção
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <section className={`p-8 rounded-2xl border transition-all duration-500 shadow-2xl ${isAtivo ? 'bg-gradient-to-b from-red-950/40 to-[#1c1d29] border-red-900/50' : 'bg-gradient-to-b from-[#232533] to-[#1c1d29] border-[#32364a]'}`}>
          
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
            <div>
              <h3 className="text-xl font-black text-gray-200 drop-shadow-md">Modo de Manutenção</h3>
              <p className="text-sm text-gray-400 mt-1">Ao ativar, o aplicativo dos usuários será bloqueado com a mensagem abaixo.</p>
            </div>
            
            {/* O "Interruptor" 3D */}
            <button 
              onClick={() => setIsAtivo(!isAtivo)}
              className={`relative w-24 h-12 rounded-full shadow-inner border transition-all duration-300 ${isAtivo ? 'bg-red-600 border-red-400' : 'bg-[#13141c] border-black shadow-[inset_0_3px_6px_rgba(0,0,0,0.8)]'}`}
            >
              <div className={`absolute top-1 w-9 h-9 rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.5)] transition-all duration-300 ${isAtivo ? 'right-1 bg-white' : 'left-1 bg-gray-500'}`}></div>
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2">Mensagem Exibida aos Usuários</label>
              <textarea 
                rows={3} required value={mensagem} onChange={(e) => setMensagem(e.target.value)}
                className={`w-full bg-[#13141c] border border-black shadow-inner rounded-xl p-4 text-white focus:outline-none focus:ring-1 transition-all ${isAtivo ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
              />
            </div>

            <button type="submit" disabled={isSaving} className={`w-full border shadow-lg py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:translate-y-px transition-all ${isAtivo ? 'bg-gradient-to-b from-red-600 to-red-800 border-red-500' : 'bg-gradient-to-b from-blue-600 to-blue-800 border-blue-500'}`}>
              <CheckCircle2 size={20} /> {isSaving ? 'A Salvar...' : 'Salvar Alterações do Sistema'}
            </button>
          </form>

        </section>
      </div>
    </div>
  );
}

/* =========================================
   ECRÃ 6: GESTOR DE SÉRIES E EPISÓDIOS
========================================= */
function SeriesManagerView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<any | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSeries, setSavedSeries] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);

  // --- NOVOS ESTADOS PARA EPISÓDIOS ---
  const [gerenciandoSerie, setGerenciandoSerie] = useState<any | null>(null);
  const [episodios, setEpisodios] = useState<any[]>([]);
  const [epTemporada, setEpTemporada] = useState('1');
  const [epNumero, setEpNumero] = useState('1');
  const [epTitulo, setEpTitulo] = useState('');
  const [epVideoUrl, setEpVideoUrl] = useState('');

  useEffect(() => {
    fetchSavedSeries();
    fetchCategorias();
  }, []);

  const fetchSavedSeries = async () => {
    const { data } = await supabase.from('series').select('*').order('created_at', { ascending: false });
    if (data) setSavedSeries(data);
  };

  const fetchCategorias = async () => {
    const { data } = await supabase.from('categorias').select('*').order('created_at', { ascending: false });
    if (data) setCategorias(data);
  };

  // Carrega os episódios quando clica em "Gerenciar"
  const abrirGerenciadorDeEpisodios = async (serie: any) => {
    setGerenciandoSerie(serie);
    fetchEpisodios(serie.id);
  };

  const fetchEpisodios = async (serieId: number) => {
    const { data } = await supabase.from('episodios').select('*').eq('serie_id', serieId).order('temporada').order('numero_episodio');
    if (data) setEpisodios(data);
  };

  const salvarEpisodio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!epVideoUrl) return alert("Link de vídeo obrigatório!");
    setIsSaving(true);
    
    const novoEpisodio = {
      serie_id: gerenciandoSerie.id,
      temporada: parseInt(epTemporada),
      numero_episodio: parseInt(epNumero),
      titulo: epTitulo || `Episódio ${epNumero}`,
      video_url: epVideoUrl
    };

    const { error } = await supabase.from('episodios').insert([novoEpisodio]);
    setIsSaving(false);

    if (error) alert("Erro ao salvar episódio.");
    else {
      setEpNumero((parseInt(epNumero) + 1).toString()); // Prepara para o próximo episódio
      setEpTitulo('');
      setEpVideoUrl('');
      fetchEpisodios(gerenciandoSerie.id);
    }
  };

  const deletarEpisodio = async (id: number) => {
    if (window.confirm("Remover este episódio?")) {
      await supabase.from('episodios').delete().eq('id', id);
      fetchEpisodios(gerenciandoSerie.id);
    }
  };

  const searchSeries = async () => {
    if (!query) return;
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      alert("Erro ao pesquisar no TMDB.");
    }
  };

  const handleSaveSeries = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const finalSeriesData = {
      tmdb_id: selectedSeries.id,
      titulo: selectedSeries.name,
      sinopse: selectedSeries.overview,
      poster_url: selectedSeries.poster_path ? `https://image.tmdb.org/t/p/w500${selectedSeries.poster_path}` : null,
      ano: selectedSeries.first_air_date?.split('-')[0] || '',
      categoria: categoriaSelecionada
    };

    const { error } = await supabase.from('series').insert([finalSeriesData]);
    setIsSaving(false);

    if (error) alert("Erro ao guardar a série.");
    else {
      setSelectedSeries(null); setCategoriaSelecionada(''); setQuery(''); setResults([]);
      fetchSavedSeries(); 
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Remover série do catálogo? (Isso apagará todos os episódios juntos)")) {
      await supabase.from('series').delete().eq('id', id);
      fetchSavedSeries();
      if (gerenciandoSerie?.id === id) setGerenciandoSerie(null);
    }
  };

  return (
    <div className="animate-in slide-in-from-right-8 duration-300">
      <div className="flex items-center gap-4 mb-8 border-b border-[#32364a] pb-4">
        <button onClick={() => onNavigate('dashboard')} className="p-2 bg-[#2b2d3d] border border-[#3a3e52] shadow-md rounded-lg hover:brightness-110 active:translate-y-px">
          <ArrowLeft size={20} className="text-gray-300" />
        </button>
        <h2 className="text-2xl font-bold text-gray-200 drop-shadow-md flex items-center gap-2">
          <Tv className="text-purple-500" /> Central de Séries (TMDB)
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LADO ESQUERDO: DINÂMICO (Busca TMDB ou Gestor de Episódios) */}
        {gerenciandoSerie ? (
          <section className="bg-gradient-to-b from-[#232533] to-[#1c1d29] p-6 rounded-2xl border border-purple-500/50 shadow-xl">
            <div className="flex justify-between items-start mb-6 border-b border-[#32364a] pb-4">
               <div>
                 <h3 className="text-lg font-bold text-gray-200 flex items-center gap-2"><FolderTree size={18} className="text-purple-500"/> Episódios</h3>
                 <p className="text-sm text-purple-400 font-bold mt-1">{gerenciandoSerie.titulo}</p>
               </div>
               <button onClick={() => setGerenciandoSerie(null)} className="text-xs font-bold text-gray-400 hover:text-white bg-[#13141c] px-3 py-1.5 rounded-lg border border-black shadow-inner">Voltar à Busca</button>
            </div>

            {/* FORMULÁRIO DE NOVO EPISÓDIO */}
            <form onSubmit={salvarEpisodio} className="bg-[#1f212e] p-5 rounded-xl border border-[#3a3e52] shadow-inner mb-6 space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Temporada</label>
                    <input type="number" min="1" required value={epTemporada} onChange={(e) => setEpTemporada(e.target.value)} className="w-full bg-[#13141c] border border-black shadow-inner rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nº do Episódio</label>
                    <input type="number" min="1" required value={epNumero} onChange={(e) => setEpNumero(e.target.value)} className="w-full bg-[#13141c] border border-black shadow-inner rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                  </div>
               </div>
               <div>
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Título do Episódio (Opcional)</label>
                 <input type="text" placeholder="Ex: O Início..." value={epTitulo} onChange={(e) => setEpTitulo(e.target.value)} className="w-full bg-[#13141c] border border-black shadow-inner rounded-lg p-3 text-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500" />
               </div>
               <div>
                 <label className="text-[10px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1"><Video size={12}/> Link do Vídeo (.mp4)</label>
                 <input type="url" required value={epVideoUrl} onChange={(e) => setEpVideoUrl(e.target.value)} className="w-full bg-[#13141c] border border-black shadow-inner rounded-lg p-3 text-green-400 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
               </div>
               <button type="submit" disabled={isSaving} className="w-full bg-gradient-to-b from-purple-600 to-purple-800 border border-purple-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:translate-y-px text-sm">
                  <Plus size={16} /> {isSaving ? 'A Salvar...' : 'Adicionar Episódio'}
               </button>
            </form>

            {/* LISTA DE EPISÓDIOS DA SÉRIE */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
              {episodios.length === 0 ? <p className="text-center text-xs text-gray-500 py-4">Nenhum episódio salvo ainda.</p> : null}
              {episodios.map(ep => (
                <div key={ep.id} className="bg-[#2a2c3d] p-3 rounded-lg border border-[#3a3e52] flex justify-between items-center group">
                   <div className="flex items-center gap-3">
                     <span className="bg-purple-900/50 text-purple-300 border border-purple-500/30 text-[10px] font-black px-2 py-1 rounded">S{ep.temporada.toString().padStart(2, '0')}E{ep.numero_episodio.toString().padStart(2, '0')}</span>
                     <p className="text-sm font-bold text-gray-200 truncate max-w-[150px]">{ep.titulo}</p>
                   </div>
                   <button onClick={() => deletarEpisodio(ep.id)} className="text-red-500 opacity-0 group-hover:opacity-100 hover:scale-110"><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* SE NÃO ESTIVER GERENCIANDO, MOSTRA A BUSCA NORMAL DO TMDB */
          <section className="bg-gradient-to-b from-[#232533] to-[#1c1d29] p-6 rounded-2xl border border-[#32364a] shadow-xl">
            <h3 className="text-lg font-bold text-gray-300 mb-6 flex items-center gap-2"><Search size={18} className="text-purple-500"/> Pesquisar Séries</h3>
            
            {!selectedSeries ? (
              <>
                <div className="flex gap-3 mb-6">
                  <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && searchSeries()} placeholder="Ex: Breaking Bad..." className="flex-1 bg-[#13141c] border border-black shadow-inner rounded-xl p-4 text-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500"/>
                  <button onClick={searchSeries} className="bg-gradient-to-b from-purple-600 to-purple-800 border border-purple-500 rounded-xl px-6 font-bold shadow-md hover:brightness-110 active:translate-y-px">Pesquisar</button>
                </div>
                <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 scrollbar-hide">
                  {results.map((series) => (
                    <div key={series.id} className="bg-[#2a2c3d] p-3 rounded-xl border border-[#3a3e52] shadow-md flex gap-4 items-center group hover:border-purple-500/50">
                      <img src={series.poster_path ? `https://image.tmdb.org/t/p/w92${series.poster_path}` : 'https://via.placeholder.com/92'} className="w-12 h-16 object-cover rounded-md" />
                      <div className="flex-1"><p className="font-bold text-gray-200 text-sm">{series.name}</p><p className="text-xs text-gray-400">{series.first_air_date?.split('-')[0]}</p></div>
                      <button onClick={() => setSelectedSeries(series)} className="bg-gradient-to-b from-green-600 to-green-800 border border-green-500 px-4 py-2 rounded-lg text-xs font-bold hover:brightness-110">Importar</button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveSeries} className="bg-[#1f212e] p-6 rounded-xl border border-purple-500/50 shadow-inner space-y-6">
                <div className="flex gap-5"><img src={`https://image.tmdb.org/t/p/w200${selectedSeries.poster_path}`} className="w-24 rounded-lg shadow-lg border border-white/10" /><div><h3 className="text-xl font-bold text-white drop-shadow-md">{selectedSeries.name}</h3><p className="text-xs text-gray-400 mt-2 line-clamp-4 font-medium leading-relaxed">{selectedSeries.overview}</p></div></div>
                <div><label className="flex items-center gap-2 text-sm font-bold text-yellow-400 mb-2"><Tag size={16}/> Categoria da Série</label>
                  <select value={categoriaSelecionada} onChange={(e) => setCategoriaSelecionada(e.target.value)} className="w-full bg-[#13141c] border border-black shadow-inner rounded-xl p-4 text-white font-bold focus:outline-none focus:ring-1 focus:ring-yellow-500 appearance-none">
                    <option value="">Nenhuma / Solto</option>
                    {categorias.map(cat => (<option key={cat.id} value={cat.nome}>{cat.icone} {cat.nome}</option>))}
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setSelectedSeries(null)} className="flex-1 bg-gradient-to-b from-gray-700 to-gray-900 border border-gray-600 py-3 rounded-xl font-bold hover:brightness-110">Cancelar</button>
                  <button type="submit" disabled={isSaving} className="flex-[2] bg-gradient-to-b from-purple-600 to-purple-800 border border-purple-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50"><Plus size={18} /> {isSaving ? 'A Guardar...' : 'Salvar Série'}</button>
                </div>
              </form>
            )}
          </section>
        )}

        {/* LADO DIREITO: CATÁLOGO DE SÉRIES (Permanece igual, mas com o botão NOVO) */}
        <section className="bg-gradient-to-b from-[#232533] to-[#1c1d29] p-6 rounded-2xl border border-[#32364a] shadow-xl">
          <h3 className="text-lg font-bold text-gray-300 mb-6 flex items-center gap-2">
            <Tv size={18} className="text-green-500"/> Séries no Catálogo ({savedSeries.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[550px] overflow-y-auto pr-2 scrollbar-hide">
            {savedSeries.map(series => (
              <div key={series.id} className={`relative group rounded-xl overflow-hidden border shadow-lg transition-all ${gerenciandoSerie?.id === series.id ? 'border-purple-500 ring-2 ring-purple-500/50' : 'border-[#3a3e52]'}`}>
                <img src={series.poster_url} className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                {series.categoria && <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded text-[9px] font-bold text-yellow-400">{series.categoria}</div>}
                
                {/* CAMADA INFERIOR COM BOTÕES (GERENCIAR / REMOVER) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end p-2 translate-y-6 group-hover:translate-y-0 transition-transform">
                  <p className="text-[11px] font-bold text-white truncate mb-2">{series.titulo}</p>
                  <div className="flex gap-1">
                    <button onClick={() => abrirGerenciadorDeEpisodios(series)} className="flex-1 bg-gradient-to-b from-blue-600 to-blue-800 border border-blue-500 text-[9px] py-1.5 rounded flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                       Gerenciar
                    </button>
                    <button onClick={() => handleDelete(series.id)} className="bg-gradient-to-b from-red-600 to-red-800 border border-red-500 px-2 py-1.5 rounded flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={12}/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
function StatCard({ title, value, subtitle, color, icon }: any) {
  return (
    <div className={`p-5 rounded-xl bg-gradient-to-b ${color} border border-white/15 border-b-black/40 shadow-lg`}>
      <div className="flex items-center gap-2 text-white/90 mb-2 font-medium text-xs">{icon} <span>{title}</span></div>
      <div className="flex items-baseline gap-2"><span className="text-4xl font-black text-white drop-shadow-md">{value}</span><span className="text-xs text-white/70 font-medium">{subtitle}</span></div>
    </div>
  );
}
/* --- COMPONENTES AUXILIARES --- */
function Botao3D({ icon, title, subtitle, active=false, cor = "from-[#3a3e52] to-[#252736]" }: any) {
  return (
    <button className={`relative flex flex-col items-center justify-center p-5 rounded-2xl aspect-square w-full bg-gradient-to-b ${cor} border border-[#454960] border-b-[#1a1b26] shadow-[0_8px_15px_rgba(0,0,0,0.5),inset_0_2px_0_rgba(255,255,255,0.08),inset_0_-2px_5px_rgba(0,0,0,0.2)] hover:brightness-110 active:translate-y-1 transition-all duration-100 group cursor-pointer ${active ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : ''}`}>
      <div className={`text-white drop-shadow-md mb-3 group-hover:scale-105 transition-transform ${active ? 'text-blue-400' : ''}`}>{icon}</div>
      <h3 className="font-black text-xs text-gray-100 drop-shadow-md text-center leading-tight">{title}</h3>
      <p className="text-[9px] text-gray-400 font-medium tracking-tight mt-0.5">{subtitle}</p>
    </button>
  );
}


function DashboardMovieCard({ title, genre, year, img }: any) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-[#3a3e52] shadow-xl group">
      <img src={img} className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-4">
        <h4 className="font-bold text-sm text-white leading-tight drop-shadow-md truncate">{title}</h4>
        <div className="flex justify-between items-center mt-1">
          <span className="text-[10px] text-yellow-500 font-bold truncate max-w-[70%]">{genre}</span>
          <span className="text-[10px] text-gray-500 font-bold">{year}</span>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ label, percentage, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-xs font-bold text-gray-300 mb-2">
        <div className="flex items-center gap-2">
          <Server size={14} className="text-gray-500" /> {label}
        </div>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-3.5 bg-black/50 rounded-full shadow-inner border border-white/5 overflow-hidden">
        <div className={`h-full ${color} rounded-full shadow-[0_0_10px_currentColor] transition-all duration-1000`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
/* =========================================
   ECRÃ 7: DEFINIÇÕES DO APLICATIVO
========================================= */
function SettingsView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [appName, setAppName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from('configuracoes').select('*').eq('id', 1).single();
    if (data) {
      setAppName(data.app_nome || '8D Cine');
      setSupportEmail(data.email_suporte || '');
      setInstagramLink(data.link_instagram || '');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const { error } = await supabase.from('configuracoes').update({
      app_nome: appName,
      email_suporte: supportEmail,
      link_instagram: instagramLink
    }).eq('id', 1);
    
    setIsSaving(false);
    if (error) alert("Erro ao salvar as definições.");
    else alert("Definições atualizadas com sucesso!");
  };

  return (
    <div className="animate-in slide-in-from-right-8 duration-300">
      <div className="flex items-center gap-4 mb-8 border-b border-[#32364a] pb-4">
        <button onClick={() => onNavigate('dashboard')} className="p-2 bg-[#2b2d3d] border border-[#3a3e52] shadow-md rounded-lg hover:brightness-110 active:translate-y-px">
          <ArrowLeft size={20} className="text-gray-300" />
        </button>
        <h2 className="text-2xl font-bold text-gray-200 drop-shadow-md flex items-center gap-2">
          <Settings className="text-gray-400" /> Definições da Plataforma
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <section className="bg-gradient-to-b from-[#232533] to-[#1c1d29] p-8 rounded-2xl border border-[#32364a] shadow-xl">
          
          <div className="mb-8 pb-6 border-b border-white/5">
            <h3 className="text-xl font-black text-gray-200 drop-shadow-md">Informações da Marca</h3>
            <p className="text-sm text-gray-400 mt-1">Esses dados serão exibidos no aplicativo principal para os seus usuários.</p>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2">Nome do Aplicativo</label>
              <input type="text" required value={appName} onChange={(e) => setAppName(e.target.value)} className="w-full bg-[#13141c] border border-black shadow-inner rounded-xl p-4 text-white font-bold focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2">E-mail de Suporte</label>
                <input type="email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} placeholder="contato@seudominio.com" className="w-full bg-[#13141c] border border-black shadow-inner rounded-xl p-4 text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2">Link do Instagram</label>
                <input type="url" value={instagramLink} onChange={(e) => setInstagramLink(e.target.value)} placeholder="https://instagram.com/..." className="w-full bg-[#13141c] border border-black shadow-inner rounded-xl p-4 text-pink-400 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-pink-500" />
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" disabled={isSaving} className="w-full bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-600 shadow-lg py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:translate-y-px text-white transition-all hover:border-blue-500">
                <CheckCircle2 size={20} /> {isSaving ? 'A Guardar...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
/* =========================================
   ECRÃ 8: ESTATÍSTICAS E RELATÓRIOS
========================================= */
function AnalyticsView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [stats, setStats] = useState({ filmes: 0, series: 0, episodios: 0, usuarios: 0 });
  const [ultimosUsuarios, setUltimosUsuarios] = useState<any[]>([]);

  useEffect(() => {
    async function carregarDados() {
      // Conta os totais
      const { count: cFilmes } = await supabase.from('filmes').select('*', { count: 'exact', head: true });
      const { count: cSeries } = await supabase.from('series').select('*', { count: 'exact', head: true });
      const { count: cEps } = await supabase.from('episodios').select('*', { count: 'exact', head: true });
      const { count: cUser } = await supabase.from('perfis').select('*', { count: 'exact', head: true });
      
      setStats({
        filmes: cFilmes || 0,
        series: cSeries || 0,
        episodios: cEps || 0,
        usuarios: cUser || 0
      });

      // Puxa os 5 usuários mais recentes
      const { data: users } = await supabase.from('perfis').select('*').order('created_at', { ascending: false }).limit(5);
      if (users) setUltimosUsuarios(users);
    }
    carregarDados();
  }, []);

  return (
    <div className="animate-in slide-in-from-right-8 duration-300">
      <div className="flex items-center gap-4 mb-8 border-b border-[#32364a] pb-4">
        <button onClick={() => onNavigate('dashboard')} className="p-2 bg-[#2b2d3d] border border-[#3a3e52] shadow-md rounded-lg hover:brightness-110 active:translate-y-px">
          <ArrowLeft size={20} className="text-gray-300" />
        </button>
        <h2 className="text-2xl font-bold text-gray-200 drop-shadow-md flex items-center gap-2">
          <BarChart3 className="text-orange-500" /> Inteligência e Analytics
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LADO ESQUERDO: Volume do Catálogo */}
        <section className="bg-gradient-to-b from-[#232533] to-[#1c1d29] p-8 rounded-2xl border border-[#32364a] shadow-xl">
          <div className="mb-8 pb-6 border-b border-white/5">
            <h3 className="text-xl font-black text-gray-200 drop-shadow-md">Volume do Catálogo</h3>
            <p className="text-sm text-gray-400 mt-1">Distribuição de mídia cadastrada no banco de dados.</p>
          </div>

          <div className="space-y-6">
             <div className="bg-[#1f212e] p-5 rounded-xl border border-orange-500/30 flex justify-between items-center shadow-inner">
                <div className="flex items-center gap-3"><Film className="text-orange-400"/><span className="font-bold text-gray-300">Filmes</span></div>
                <span className="text-2xl font-black text-white">{stats.filmes}</span>
             </div>
             <div className="bg-[#1f212e] p-5 rounded-xl border border-purple-500/30 flex justify-between items-center shadow-inner">
                <div className="flex items-center gap-3"><Tv className="text-purple-400"/><span className="font-bold text-gray-300">Séries Completas</span></div>
                <span className="text-2xl font-black text-white">{stats.series}</span>
             </div>
             <div className="bg-[#1f212e] p-5 rounded-xl border border-blue-500/30 flex justify-between items-center shadow-inner">
                <div className="flex items-center gap-3"><Video className="text-blue-400"/><span className="font-bold text-gray-300">Episódios (TV)</span></div>
                <span className="text-2xl font-black text-white">{stats.episodios}</span>
             </div>
          </div>
        </section>

        {/* LADO DIREITO: Novos Clientes */}
        <section className="bg-gradient-to-b from-[#232533] to-[#1c1d29] p-8 rounded-2xl border border-[#32364a] shadow-xl">
          <div className="mb-8 pb-6 border-b border-white/5 flex justify-between items-end">
            <div>
              <h3 className="text-xl font-black text-gray-200 drop-shadow-md">Novos Assinantes</h3>
              <p className="text-sm text-gray-400 mt-1">Últimas 5 contas criadas.</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-green-400">{stats.usuarios}</span>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Total Geral</p>
            </div>
          </div>

          <div className="space-y-3">
             {ultimosUsuarios.length === 0 ? (
               <p className="text-center text-gray-500 py-6 text-sm">Nenhum usuário recente encontrado.</p>
             ) : (
               ultimosUsuarios.map(user => (
                 <div key={user.id} className="bg-[#2a2c3d] p-4 rounded-xl border border-[#3a3e52] flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-900/50 border border-green-500 flex items-center justify-center text-green-400 font-bold text-xs">
                        {user.email.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-bold text-gray-200">{user.email}</span>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(user.created_at).toLocaleDateString('pt-PT')}</span>
                 </div>
               ))
             )}
          </div>
        </section>

      </div>
    </div>
  );
}