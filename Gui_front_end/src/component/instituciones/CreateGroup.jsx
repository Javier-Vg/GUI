import React, { useState, useEffect } from 'react';

const CreateGroup = () => {
    const [groups, setGroups] = useState([]);
    const [newGroup, setNewGroup] = useState({ name: '', level: '', subjects: [], teachers: {} });
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState({});
    const [editingIndex, setEditingIndex] = useState(-1);
    const [modalVisible, setModalVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); // Mensaje de éxito

    useEffect(() => {
        // Cargar materias (ejemplo)
        const fetchedSubjects = [
            { id: 'math', name: 'Matemática' },
            { id: 'science', name: 'Ciencia' },
        ];
        setSubjects(fetchedSubjects);

        // Cargar profesores (ejemplo)
        const fetchedTeachers = {
            math: [
                { id: '1', name: 'Prof. Juan' },
                { id: '2', name: 'Prof. María' },
            ],
            science: [
                { id: '3', name: 'Prof. Luis' },
                { id: '4', name: 'Prof. Ana' },
            ],
        };
        setTeachers(fetchedTeachers);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGroup({ ...newGroup, [name]: value });
    };

    const handleSubjectChange = (e) => {
        const { value } = e.target;
        setNewGroup((prev) => {
            const subjects = prev.subjects.includes(value)
                ? prev.subjects.filter((subject) => subject !== value)
                : [...prev.subjects, value];
            return { ...prev, subjects };
        });
    };

    const handleTeacherChange = (subject, teacherId) => {
        setNewGroup((prev) => ({
            ...prev,
            teachers: { ...prev.teachers, [subject]: teacherId },
        }));
    };

    const addOrUpdateGroup = () => {
        if (editingIndex > -1) {
            const updatedGroups = [...groups];
            updatedGroups[editingIndex] = newGroup;
            setGroups(updatedGroups);
            setEditingIndex(-1);
        } else {
            setGroups([...groups, newGroup]);
            setSuccessMessage(`Grupo "${newGroup.name}" registrado con éxito!`); // Mensaje de éxito
        }
        setNewGroup({ name: '', level: '', subjects: [], teachers: {} });
    };

    const openModal = (index) => {
        setNewGroup(groups[index]);
        setEditingIndex(index);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setNewGroup({ name: '', level: '', subjects: [], teachers: {} }); // Limpiar el formulario
    };

    const handleModalSubmit = (e) => {
        e.preventDefault();
        addOrUpdateGroup();
        closeModal();
    };

    return (
        <div>
            <h2>Crear Grupo</h2>
            <form onSubmit={(e) => { e.preventDefault(); addOrUpdateGroup(); }}>
                <div>
                    <label>Nombre del Grupo:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={newGroup.name} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Nivel del Grupo:</label>
                    <select name="level" value={newGroup.level} onChange={handleInputChange} required>
                        <option value="">Selecciona un nivel</option>
                        {[1, 2, 3, 4, 5, 6].map((grade) => (
                            <option key={grade} value={grade}>{grade}°</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Materias:</label>
                    {subjects.map((subject) => (
                        <div key={subject.id}>
                            <input 
                                type="checkbox" 
                                value={subject.id} 
                                checked={newGroup.subjects.includes(subject.id)} 
                                onChange={handleSubjectChange} 
                            />
                            <label>{subject.name}</label>

                            {newGroup.subjects.includes(subject.id) && (
                                <select
                                    onChange={(e) => handleTeacherChange(subject.id, e.target.value)}
                                    defaultValue={newGroup.teachers[subject.id] || ""}
                                >
                                    <option value="" disabled>Selecciona un profesor</option>
                                    {teachers[subject.id]?.map((teacher) => (
                                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    ))}
                </div>
                <button type="submit">Agregar Grupo</button>
            </form>
            {successMessage && <p>{successMessage}</p>} {/* Mensaje de éxito */}

            {modalVisible && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Editar Grupo</h2>
                        <form onSubmit={handleModalSubmit}>
                            <div>
                                <label>Nivel del Grupo:</label>
                                <select name="level" value={newGroup.level} onChange={handleInputChange} required>
                                    <option value="">Selecciona un nivel</option>
                                    {[1, 2, 3, 4, 5, 6].map((grade) => (
                                        <option key={grade} value={grade}>{grade}°</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Materias:</label>
                                {subjects.map((subject) => (
                                    <div key={subject.id}>
                                        <input 
                                            type="checkbox" 
                                            value={subject.id} 
                                            checked={newGroup.subjects.includes(subject.id)} 
                                            onChange={handleSubjectChange} 
                                        />
                                        <label>{subject.name}</label>

                                        {newGroup.subjects.includes(subject.id) && (
                                            <select
                                                onChange={(e) => handleTeacherChange(subject.id, e.target.value)}
                                                defaultValue={newGroup.teachers[subject.id] || ""}
                                            >
                                                <option value="" disabled>Selecciona un profesor</option>
                                                {teachers[subject.id]?.map((teacher) => (
                                                    <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button type="submit">Modificar Grupo</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateGroup;
