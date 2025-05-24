import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { dreamFinderService } from '../services/dreamFinderService';

interface FormData {
  name: string;
  email: string;
  phone: string;
  dreamDress: string;
}

const DreamFinder: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    dreamDress: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(undefined);
    
    try {
      await dreamFinderService.submitRequest(formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        dreamDress: '',
      });
    } catch (err) {
      setError('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-serif text-center mb-8">Dream Dress Finder</h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Can't find your dream dress? Tell us what you're looking for, and we'll help you find it!
          </p>

          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
            >
              <h3 className="text-xl font-medium text-green-800 mb-2">Thank You!</h3>
              <p className="text-green-600">
                We've received your dream dress request. We'll be in touch soon to help you find your perfect dress.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                />
              </div>

              <div>
                <label htmlFor="dreamDress" className="block text-sm font-medium text-gray-700 mb-1">
                  Describe Your Dream Dress
                </label>
                <textarea
                  id="dreamDress"
                  name="dreamDress"
                  value={formData.dreamDress}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                  placeholder="Tell us about your dream dress... (style, fabric, details, etc.)"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-md text-white font-medium transition-colors ${
                  isSubmitting
                    ? 'bg-pink-300 cursor-not-allowed'
                    : 'bg-pink-500 hover:bg-pink-600'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Submit Dream Dress Request'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default DreamFinder; 