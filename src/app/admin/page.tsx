'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Upload, ImageIcon } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stock: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete product?")) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  const handleEdit = (product: any) => {
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      category: product.category,
      imageUrl: product.imageUrl || '',
      stock: product.stock.toString(),
    });
    setEditingId(product.id);
    setImagePreview(product.imageUrl || null);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', category: '', imageUrl: '', stock: '' });
    setEditingId(null);
    setSelectedFile(null);
    setImagePreview(null);
    setIsModalOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    let finalImageUrl = formData.imageUrl;

    if (selectedFile) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', selectedFile);
      
      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });
        const uploadData = await uploadRes.json();
        if (uploadData.imageUrl) {
          finalImageUrl = uploadData.imageUrl;
        }
      } catch (error) {
        console.error("Upload error:", error);
        setUploading(false);
        return;
      }
    }

    const payload = {
      ...formData,
      imageUrl: finalImageUrl,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/products/${editingId}` : '/api/products';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setUploading(false);
    resetForm();
    fetchProducts();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-800 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Stock</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                    {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />}
                  </div>
                  {product.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                <td className="px-6 py-4 text-gray-900 font-bold">₹{product.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-800 p-2"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800 p-2"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative">
            <button onClick={resetForm} className="absolute right-4 top-4 text-gray-400 hover:text-gray-900"><X /></button>
            <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price (₹)</label>
                  <input required type="number" min="0" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stock</label>
                  <input required type="number" min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-amber-500" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">Product Image</label>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-amber-500 transition-colors bg-gray-50 flex flex-col items-center justify-center gap-2 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="w-6 h-6 text-gray-400" />
                        <span className="text-xs text-gray-500 font-medium">{selectedFile ? selectedFile.name : 'Click to upload image'}</span>
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                      <p className="mt-1 text-[10px] text-gray-400 italic font-mono">Recommended: Square image, max 2MB</p>
                    </div>
                    {imagePreview && (
                      <div className="w-24 h-24 rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm flex-shrink-0 animate-in fade-in zoom-in duration-200">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:ring-amber-500" />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={resetForm} className="px-4 py-2 border border-gray-300 rounded-lg font-medium">Cancel</button>
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    editingId ? 'Update' : 'Create'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
