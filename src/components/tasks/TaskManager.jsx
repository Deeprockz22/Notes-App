import React, { useState } from 'react';
import { Plus, CheckSquare, Filter, Layers, ListTodo, Sparkles } from 'lucide-react';
import TaskItem from './TaskItem';
import AnimatedList from '../react-bits/AnimatedList';
import MagnetButton from '../react-bits/MagnetButton';
import DecryptedText from '../react-bits/DecryptedText';

const CATEGORIES = ['All', 'Work', 'Study', 'Personal', 'Ideas'];

export default function TaskManager({
  tasks = [],
  addTask,
  toggleTask,
  deleteTask,
  editTask
}) {
  const [newTitle, setNewTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('Work');
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [categoryFilter, setCategoryFilter] = useState('All');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addTask({
      title: newTitle.trim(),
      priority,
      category: category === 'All' ? 'General' : category,
      completed: false
    });

    setNewTitle('');
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active' && t.completed) return false;
    if (filter === 'completed' && !t.completed) return false;
    if (categoryFilter !== 'All' && t.category !== categoryFilter) return false;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="tasks-view">
      {/* Header & Stats */}
      <div className="view-header">
        <div>
          <h2 className="view-title">
            <DecryptedText text="Task Focus" speed={30} maxIterations={8} />
          </h2>
          <p className="view-subtitle">Organize your goals with frictionless priority</p>
        </div>

        <div className="task-counter-badge">
          <CheckSquare size={16} />
          <span>{completedCount} of {tasks.length} Completed</span>
        </div>
      </div>

      {/* Task Creation Input Form */}
      <form onSubmit={handleAddTask} className="task-input-bar">
        <div className="input-group-main">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Add a new task... (e.g. Finish project roadmap)"
            className="task-main-input"
          />

          <div className="task-meta-selectors">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="task-select priority-select"
              aria-label="Priority"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="task-select category-select"
              aria-label="Category"
            >
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Personal">Personal</option>
              <option value="Ideas">Ideas</option>
            </select>
          </div>
        </div>

        <MagnetButton type="submit" className="btn-action primary add-task-btn">
          <Plus size={18} />
          <span>Add Task</span>
        </MagnetButton>
      </form>

      {/* Filter and Category Bars */}
      <div className="task-filters-row">
        <div className="status-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </button>
          <button
            className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({tasks.length - completedCount})
          </button>
          <button
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </button>
        </div>

        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-tab ${categoryFilter === cat ? 'active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state-card">
          <ListTodo size={36} className="empty-icon" />
          <h3 className="empty-title">No tasks found</h3>
          <p className="empty-desc">
            {filter === 'completed'
              ? 'No completed tasks yet. Finish a task to celebrate!'
              : 'Add your first task above to start planning your flow.'}
          </p>
        </div>
      ) : (
        <AnimatedList className="task-animated-list" itemClassName="task-list-item-wrapper">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))}
        </AnimatedList>
      )}
    </div>
  );
}
