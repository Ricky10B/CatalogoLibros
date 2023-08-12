import { IISBNProp } from '../interfaces/interfacesComponents'

export interface SyncWindowsLibraryProp {
  addBookToReadingList: ({ ISBN }: IISBNProp) => void,
  removeBookFromReadingList: ({ ISBN }: IISBNProp) => void
}

interface DataWindowsLibraryProps extends SyncWindowsLibraryProp {
  totalNewValues: number,
  totalOldValues: number,
  newReadingList: string[],
  oldReadingList: string[]
}

export function syncWindowsLibrary ({
  addBookToReadingList,
  removeBookFromReadingList,
  totalNewValues,
  totalOldValues,
  newReadingList,
  oldReadingList
}: DataWindowsLibraryProps) {
  if (totalOldValues < totalNewValues) {
    const [ISBN] = newReadingList.filter((ISBNOfBook: string) =>
      !oldReadingList.includes(ISBNOfBook)
    )
    
    addBookToReadingList({ ISBN })
  }

  if (totalOldValues > totalNewValues) {
    const [ISBN] = oldReadingList.filter((ISBNOfBook: string) =>
      !newReadingList.includes(ISBNOfBook)
    )
    
    removeBookFromReadingList({ ISBN })
  }
}
