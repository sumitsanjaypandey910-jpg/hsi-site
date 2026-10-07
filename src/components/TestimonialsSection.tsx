import React from 'react';
import { Star, Quote, ShieldCheck, UserCheck, MapPin } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useSiteContent();

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-950 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
            <span>Fiduciary Trust & Client Stories</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0a192f] font-heading">
            Trusted by 18,500+ Indian Families & High Net Worth Individuals
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Read authentic experiences from professionals, business founders, and retirees who rely on Horizon Secure Investments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-orange-400">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-orange-500/30" />
                </div>

                {/* Quote Text */}
                <p className="text-slate-700 text-sm leading-relaxed italic mb-4">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  {item.avatarUrl ? (
                    <img
                      src={item.avatarUrl}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover border border-orange-300 shadow-2xs shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-orange-100 text-orange-950 font-black text-sm flex items-center justify-center border border-orange-300 shadow-2xs shrink-0">
                      {item.name.charAt(0)}
                    </div>
                  )}

                  <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-[#0a192f] truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">
                      {item.role}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-orange-900 font-medium">
                      {item.city && (
                        <span className="inline-flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-orange-600" />
                          <span>{item.city}</span>
                        </span>
                      )}
                      {item.portfolio && (
                        <span className="px-1.5 py-0.5 rounded bg-orange-50 text-orange-950 border border-orange-200/60 text-[10px] font-semibold">
                          {item.portfolio}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
