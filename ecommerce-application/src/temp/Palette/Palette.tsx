import React from 'react';

export const Palette = () => {
  return (
    <>
      <h2 className="text-4xl font-bold text-center">Colors palette</h2>
      <div className="flex justify-around items-center m-8">
        <div>
          <h3>Light</h3>
          <div className="w-52 border-slate-800 border-2 h-10 bg-card-color">
            card-bg-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-primary-color">
            primary-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-secondary-color">
            secondary-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-accent-color">
            accent-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-hover-color">
            hover-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-disable-color">
            disable-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-success-color">
            success-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-alert-color">
            alert-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-danger-color">
            danger-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-fade-text-color">
            fade-text-color
          </div>
        </div>
        <div className="dark">
          <h3>Dark</h3>
          <div className="w-52 border-slate-800 border-2 h-10 dark:bg-dt-card-color">
            card-bg-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 dark:bg-dt-primary-color">
            primary-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 dark:bg-dt-secondary-color">
            secondary-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 dark:bg-dt-accent-color">
            accent-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 dark:bg-dt-hover-color">
            hover-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 dark:bg-dt-disable-color">
            disable-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 dark:bg-dt-success-color">
            success-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 dark:bg-dt-alert-color">
            alert-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 dark:bg-dt-danger-color">
            danger-color
          </div>
          <div className="w-52 border-slate-800 border-2 h-10 dark:bg-dt-fade-text-color">
            fade-text-color
          </div>
        </div>
      </div>
    </>
  );
};
