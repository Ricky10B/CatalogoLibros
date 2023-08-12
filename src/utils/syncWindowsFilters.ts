export interface SyncWindowsFiltersProps {
  handleNewGenre: ({ genre }: { genre: string }) => void
}

interface DataWindowsFiltersProps extends SyncWindowsFiltersProps {
  genre: string
}

export function syncWindowsFilters ({
  handleNewGenre,
  genre
}: DataWindowsFiltersProps) {
  handleNewGenre({ genre })
}
