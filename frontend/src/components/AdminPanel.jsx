import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Grid3x3, Link, GitBranch, Zap, Type, Binary, Layers, ListOrdered, Gem, Hash, ArrowUpDown, Search, TrendingUp, GitMerge } from 'lucide-react';

// Zod schema matching the problem schema
const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['array', 'linkedList', 'graph', 'dp', 'string', 'tree', 'stack', 'queue', 'heap', 'hash', 'sorting', 'searching', 'greedy', 'backtracking']),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().min(1, 'Explanation is required')
    })
  ).min(1, 'At least one visible test case required'),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required')
    })
  ).min(1, 'At least one hidden test case required'),
  startCode: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      initialCode: z.string().min(1, 'Initial code is required')
    })
  ).length(3, 'All three languages required'),
  referenceSolution: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      completeCode: z.string().min(1, 'Complete code is required')
    })
  ).length(3, 'All three languages required')
});

function AdminPanel() {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState('');

  const topicOptions = [
    { value: 'array', label: 'Array', icon: Grid3x3, gradient: 'from-blue-500 to-cyan-500' },
    { value: 'linkedList', label: 'Linked List', icon: Link, gradient: 'from-purple-500 to-pink-500' },
    { value: 'graph', label: 'Graph', icon: GitBranch, gradient: 'from-green-500 to-emerald-500' },
    { value: 'dp', label: 'Dynamic Programming', icon: Zap, gradient: 'from-yellow-500 to-orange-500' },
    { value: 'string', label: 'String', icon: Type, gradient: 'from-red-500 to-rose-500' },
    { value: 'tree', label: 'Tree', icon: Binary, gradient: 'from-indigo-500 to-violet-500' },
    { value: 'stack', label: 'Stack', icon: Layers, gradient: 'from-teal-500 to-cyan-500' },
    { value: 'queue', label: 'Queue', icon: ListOrdered, gradient: 'from-fuchsia-500 to-pink-500' },
    { value: 'heap', label: 'Heap', icon: Gem, gradient: 'from-amber-500 to-yellow-500' },
    { value: 'hash', label: 'Hash Table', icon: Hash, gradient: 'from-lime-500 to-green-500' },
    { value: 'sorting', label: 'Sorting', icon: ArrowUpDown, gradient: 'from-sky-500 to-blue-500' },
    { value: 'searching', label: 'Searching', icon: Search, gradient: 'from-violet-500 to-purple-500' },
    { value: 'greedy', label: 'Greedy', icon: TrendingUp, gradient: 'from-emerald-500 to-teal-500' },
    { value: 'backtracking', label: 'Backtracking', icon: GitMerge, gradient: 'from-orange-500 to-red-500' }
  ];

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      startCode: [
        { language: 'C++', initialCode: '' },
        { language: 'Java', initialCode: '' },
        { language: 'JavaScript', initialCode: '' }
      ],
      referenceSolution: [
        { language: 'C++', completeCode: '' },
        { language: 'Java', completeCode: '' },
        { language: 'JavaScript', completeCode: '' }
      ]
    }
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible
  } = useFieldArray({
    control,
    name: 'visibleTestCases'
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden
  } = useFieldArray({
    control,
    name: 'hiddenTestCases'
  });

  const onSubmit = async (data) => {
    try {
      await axiosClient.post('/problem/create', data);
      alert('Problem created successfully!');
      navigate('/');
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Problem</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                {...register('title')}
                className={`input input-bordered ${errors.title && 'input-error'}`}
              />
              {errors.title && (
                <span className="text-error">{errors.title.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register('description')}
                className={`textarea textarea-bordered h-32 ${errors.description && 'textarea-error'}`}
              />
              {errors.description && (
                <span className="text-error">{errors.description.message}</span>
              )}
            </div>

            <div className="flex gap-4">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Difficulty</span>
                </label>
                <select
                  {...register('difficulty')}
                  className={`select select-bordered ${errors.difficulty && 'select-error'}`}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text font-semibold text-lg">Topic Category</span>
                </label>
                <input type="hidden" {...register('tags')} value={selectedTag} />

                {/* Topic Grid */}
                <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2 border border-slate-700 rounded-lg bg-slate-900/50">
                  {topicOptions.map((topic) => {
                    const IconComponent = topic.icon;
                    const isSelected = selectedTag === topic.value;
                    return (
                      <div
                        key={topic.value}
                        onClick={() => {
                          setSelectedTag(topic.value);
                          setValue('tags', topic.value);
                        }}
                        className={`relative cursor-pointer group transition-all duration-300 ${isSelected ? 'scale-105' : 'hover:scale-102'
                          }`}
                      >
                        {/* Glow Effect */}
                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${topic.gradient} rounded-lg blur opacity-0 ${isSelected ? 'opacity-40' : 'group-hover:opacity-20'
                          } transition-all duration-300`}></div>

                        {/* Card */}
                        <div className={`relative bg-slate-800 rounded-lg p-3 border-2 transition-all duration-300 ${isSelected
                            ? `border-transparent bg-gradient-to-br ${topic.gradient} bg-opacity-20`
                            : 'border-slate-700 hover:border-slate-600'
                          }`}>
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-md bg-gradient-to-br ${topic.gradient} ${isSelected ? 'scale-110' : 'group-hover:scale-105'
                              } transition-transform duration-300`}>
                              <IconComponent className="w-4 h-4 text-white" strokeWidth={2.5} />
                            </div>
                            <span className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                              } transition-colors`}>
                              {topic.label}
                            </span>
                          </div>

                          {/* Selected Indicator */}
                          {isSelected && (
                            <div className="absolute top-1 right-1">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {errors.tags && (
                  <span className="text-error text-sm mt-2">{errors.tags.message}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Test Cases */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Cases</h2>

          {/* Visible Test Cases */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Visible Test Cases</h3>
              <button
                type="button"
                onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
                className="btn btn-sm btn-primary"
              >
                Add Visible Case
              </button>
            </div>

            {visibleFields.map((field, index) => (
              <div key={field.id} className="border p-4 rounded-lg space-y-2">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeVisible(index)}
                    className="btn btn-xs btn-error"
                  >
                    Remove
                  </button>
                </div>

                <input
                  {...register(`visibleTestCases.${index}.input`)}
                  placeholder="Input"
                  className="input input-bordered w-full"
                />

                <input
                  {...register(`visibleTestCases.${index}.output`)}
                  placeholder="Output"
                  className="input input-bordered w-full"
                />

                <textarea
                  {...register(`visibleTestCases.${index}.explanation`)}
                  placeholder="Explanation"
                  className="textarea textarea-bordered w-full"
                />
              </div>
            ))}
          </div>

          {/* Hidden Test Cases */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Hidden Test Cases</h3>
              <button
                type="button"
                onClick={() => appendHidden({ input: '', output: '' })}
                className="btn btn-sm btn-primary"
              >
                Add Hidden Case
              </button>
            </div>

            {hiddenFields.map((field, index) => (
              <div key={field.id} className="border p-4 rounded-lg space-y-2">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeHidden(index)}
                    className="btn btn-xs btn-error"
                  >
                    Remove
                  </button>
                </div>

                <input
                  {...register(`hiddenTestCases.${index}.input`)}
                  placeholder="Input"
                  className="input input-bordered w-full"
                />

                <input
                  {...register(`hiddenTestCases.${index}.output`)}
                  placeholder="Output"
                  className="input input-bordered w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Code Templates */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Code Templates</h2>

          <div className="space-y-6">
            {[0, 1, 2].map((index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-medium">
                  {index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'}
                </h3>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Initial Code</span>
                  </label>
                  <pre className="bg-base-300 p-4 rounded-lg">
                    <textarea
                      {...register(`startCode.${index}.initialCode`)}
                      className="w-full bg-transparent font-mono"
                      rows={6}
                    />
                  </pre>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Reference Solution</span>
                  </label>
                  <pre className="bg-base-300 p-4 rounded-lg">
                    <textarea
                      {...register(`referenceSolution.${index}.completeCode`)}
                      className="w-full bg-transparent font-mono"
                      rows={6}
                    />
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Create Problem
        </button>
      </form>
    </div>
  );
}

export default AdminPanel;