import React from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  start_date: string;
  picture: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="relative bg-green-50 p-4 rounded-xl shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105 max-w-xs">
      {/* Imagen del Proyecto */}
      <div className="overflow-hidden rounded-lg mb-4">
        <img
          src={project.picture}
          alt={project.name}
          className="w-full h-36 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      {/* Contenido del Proyecto */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-green-200">
        <h2 className="text-sm font-bold text-green-700 truncate">{project.name}</h2>
        <p className="mt-2 text-xs text-gray-600 line-clamp-3">{project.description}</p>
        <p className="mt-2 text-xs text-gray-500">
          <strong>Start Date:</strong> {project.start_date}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
