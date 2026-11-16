import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'quiz/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'quiz/:id/answers',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/users/updateuser/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
