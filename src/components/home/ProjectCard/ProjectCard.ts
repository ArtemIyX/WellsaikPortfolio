import type { ProjectContent } from '@/content/home'

export type ProjectCardMediaSide = 'start' | 'end'

export interface ProjectCardProps {
  project: ProjectContent
  mediaSide?: ProjectCardMediaSide
}
