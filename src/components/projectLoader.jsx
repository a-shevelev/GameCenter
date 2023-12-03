// ProjectLoader.js in the main project
import React, { useState, useEffect } from "react";

function ProjectLoader({ port }) {
  const [ProjectComponent, setProjectComponent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        // Use dynamic import() with a template string to construct the correct URL
        const module = await import(`http://localhost:3002`);
        console.log("Module:", module);
        if (module && module.default) {
          setProjectComponent(module.default);
        } else {
          setError(
            new Error(
              `Project module not found or does not have a default export: ${module}`
            )
          );
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    loadProject();
  }, [port]);

  if (error) {
    return <div>Error loading project: {error.message}</div>;
  }

  return ProjectComponent ? <ProjectComponent /> : <div>Loading...</div>;
}

export default ProjectLoader;
