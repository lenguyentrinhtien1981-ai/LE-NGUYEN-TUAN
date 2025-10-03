
import React from 'react';
import { Section } from './Section';
import { EXPERT_TITLES } from '../constants';

export const AboutExpert: React.FC = () => {
  return (
    <Section id="about" title="Giới thiệu về chuyên gia">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <img 
            src="https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-6/480310439_611902308285951_7988994193849756933_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEGdvC1ciPVD-ckIIiAJYMLkXnMNsp-Z8WRecw2yn5nxYfXcIRgAzEk-afGZFkbsi4Ps9p0h0yS2NLGIPTausdu&_nc_ohc=Jknrjptx86IQ7kNvwFmHDrX&_nc_oc=Adm9sDxp_DwgPLw7cnDPbjcdvZnvYngL2eJxn5vWgMyow_K0iFzZ7e0clTE2NtuOOwH350EzFaFcqIlK-yTUjuyf&_nc_pt=1&_nc_zt=23&_nc_ht=scontent.fhan3-2.fna&_nc_gid=6wHBA395qGkA1pXmeGJbow&oh=00_AfZurw239dv2nm9gqErgfO9EnH8fB60PXWQMjJGf9TbXbg&oe=68E145F0" 
            alt="Chuyên gia Lê Công Năng" 
            className="rounded-2xl shadow-lg w-full max-w-sm border-4 border-slate-700"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-3xl font-bold text-white font-montserrat">Lê Công Năng</h3>
          <ul className="space-y-2 list-disc list-inside text-gray-300">
            {EXPERT_TITLES.map((title, index) => <li key={index}>{title}</li>)}
          </ul>
        </div>
      </div>
    </Section>
  );
};
