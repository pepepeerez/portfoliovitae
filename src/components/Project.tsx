import { useState, useEffect, ChangeEvent } from 'react';
import { FaArrowLeft, FaArrowRight, FaSearch, FaTrashAlt } from 'react-icons/fa';
import ProjectCard from './ProjectCard';

interface Project {
  id: number;
  name: string;
  description: string;
  start_date: string;
  picture: string;
}

const Projects = () => {
  const [page, setPage] = useState<number>(0);  // Página actual
  const [posts, setPosts] = useState<Project[]>([]);  // Todos los proyectos
  const [filteredPosts, setFilteredPosts] = useState<Project[]>([]);  // Proyectos filtrados
  const [totalPages, setTotalPages] = useState<number>(0);  // Total de páginas
  const [searchTerm, setSearchTerm] = useState<string>('');  // Término de búsqueda
  const [testMode, setTestMode] = useState<boolean>(true); // Modo de prueba
  const [errorMessage, setErrorMessage] = useState<string>(''); // Mensaje de error
  const [successMessage, setSuccessMessage] = useState<string>(''); // Mensaje de éxito

  const url = "http://localhost:8080/api/v1/projects";
  const pageSize = 2; // Número de proyectos por página

  // Cargar proyectos de la API cuando la página cambie
  useEffect(() => {
    fetchProjects(page);
  }, [page]);

  const fetchProjects = async (p = 0) => {
    try {
      const response = await fetch(`${url}?size=${pageSize}&page=${p}`);
      const data = await response.json();
      setPosts(data.content || []);
      setFilteredPosts(data.content || []);
      setTotalPages(Math.ceil((data.totalElements || 0) / pageSize));  // Calcular total de páginas
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Filtrar proyectos según el término de búsqueda
  const filterProjects = (search: string) => {
    const lowercasedSearch = search.toLowerCase();
    if (!search.trim()) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((project) =>
          project.name.toLowerCase().includes(lowercasedSearch)
        )
      );
    }
  };

  // Manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterProjects(value); // Filtrar proyectos mientras escribes
  };

  // Eliminar un proyecto
  const handleDelete = async (id: number) => {
    if (!testMode) {
      setErrorMessage('El modo de prueba está desactivado, no se puede eliminar.');
      return;
    }

    try {
      const response = await fetch(`${url}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('No se pudo eliminar el proyecto.');
      }

      setFilteredPosts(filteredPosts.filter((project) => project.id !== id));
      setSuccessMessage('Proyecto eliminado exitosamente.');
    } catch (error) {
      setErrorMessage(error.message || 'Error al eliminar el proyecto.');
    }
  };

  // Calcular los proyectos a mostrar en la página actual
  const projectsToShow = filteredPosts.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <>
      {/* Barra de búsqueda */}
      <div className="mb-6 flex items-center justify-center relative">
        <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 px-4 w-full focus:outline-none text-gray-700"
          />
          <button className="p-2 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Mensajes de error o éxito */}
      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}

      {/* Lista de proyectos */}
      <div className="flex justify-center gap-4 mt-6">
        {projectsToShow.length > 0 ? (
          projectsToShow.map((project) => (
            <div key={project.id} className="relative">
              <ProjectCard project={project} />
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => handleDelete(project.id)}
                  disabled={!testMode}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    testMode
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <FaTrashAlt className="inline mr-2" /> Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron proyectos que coincidan con la búsqueda.</p>
        )}
      </div>

      {/* Paginación */}
      <div className="mt-6 flex justify-center items-center space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
          className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full disabled:bg-gray-300 hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
        >
          <FaArrowLeft className="text-lg" />
        </button>
        <span className="text-lg font-semibold text-gray-700">
          Página {page + 1} de {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages - 1}
          className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full disabled:bg-gray-300 hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
        >
          <FaArrowRight className="text-lg" />
        </button>
      </div>
    </>
  );
};

export default Projects;
