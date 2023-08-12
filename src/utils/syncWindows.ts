import { syncWindowsLibrary, SyncWindowsLibraryProp } from './syncWindowsLibrary'
import { syncWindowsFilters, SyncWindowsFiltersProps } from './syncWindowsFilters'

interface ISyncWindows extends SyncWindowsFiltersProps, SyncWindowsLibraryProp {}

export function syncWindows ({
  handleNewGenre,
  addBookToReadingList,
  removeBookFromReadingList
}: ISyncWindows) {
  window.addEventListener('storage', event => {
    const { key, newValue, oldValue } = event

    const dataOldValue = JSON.parse(oldValue || '{}')
    const dataNewValue = JSON.parse(newValue || '{}')

    if (
      key === '__REDUX__STORE__filters' &&
      dataNewValue.filterGenre !== dataOldValue.filterGenre
    ) {
      const genre = dataNewValue.filterGenre ?? ''
      syncWindowsFilters({ handleNewGenre, genre })
    }

    if (key === '__REDUX__STORE__library') {
      const totalOldValues = dataOldValue.readingList?.length ?? 0
      const totalNewValues = dataNewValue.readingList?.length ?? 0

      syncWindowsLibrary({
        addBookToReadingList,
        removeBookFromReadingList,
        totalOldValues,
        totalNewValues,
        newReadingList: dataNewValue.readingList,
        oldReadingList: dataOldValue.readingList
      })
    }
  })
}
