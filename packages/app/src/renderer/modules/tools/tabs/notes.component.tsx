/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import moment from "moment"
import React from "react"
import ButtonComponent from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size as ButtonSize,
} from "Renderer/components/core/button/button.config"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { Size as CheckboxSize } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import {
  Col,
  EmptyState,
  Labels,
  RowSize,
  TableSortButton,
  TableWithSidebarWrapper,
} from "Renderer/components/core/table/table.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { NotesTestIds } from "Renderer/modules/tools/tabs/notes.enum"
import {
  FiltersWrapper,
  Row,
  NewNoteButton,
  SearchInput,
  SelectionManager,
  NotesSidebar,
  TextPreview,
  Table,
  TextCut,
  DeleteCol,
  TextInfo,
  Checkbox,
} from "Renderer/modules/tools/tabs/notes.styled"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import { intl, textFormatters } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import useTableSidebar from "Renderer/utils/hooks/use-table-sidebar"
import {
  normalizeText,
  useTextEditor,
} from "Renderer/components/core/text-editor/text-editor.hook"
import { defineMessages } from "react-intl"
import TextEditor from "Renderer/components/core/text-editor/text-editor.component"
import { useTemporaryStorage } from "Renderer/utils/hooks/use-temporary-storage/use-temporary-storage.hook"
import { isToday } from "Renderer/utils/is-today"
import { NoteCallback } from "Renderer/models/notes/notes"
import { makeNewNote } from "Renderer/models/notes/make-new-note"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"
import { SortOrder } from "Common/enums/sort-order.enum"
import modalService from "Renderer/components/core/modal/modal.service"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"

const messages = defineMessages({
  searchPlaceholder: {
    id: "module.tools.notesSearchPlaceholder",
  },
  searchNotes: {
    id: "module.tools.notesSearchNotes",
  },
  emptyListTitle: {
    id: "module.tools.notesEmptyListTitle",
  },
  emptyListNoNotes: {
    id: "module.tools.notesEmptyListNoNotes",
  },
  emptyListNotFound: {
    id: "module.tools.notesEmptyListNotFound",
  },
  newNote: {
    id: "module.tools.notesNewNote",
  },
  unsavedNote: {
    id: "module.tools.notesUnsavedNote",
  },
  note: {
    id: "module.tools.notesNote",
  },
  edited: {
    id: "module.tools.notesEdited",
  },
  today: {
    id: "component.textToday",
  },
  selectionsNumber: {
    id: "module.tools.notesSelectionsNumber",
  },
  newButton: {
    id: "module.tools.notesNewButton",
  },
  deleteButton: {
    id: "module.tools.notesDeleteButton",
  },
  charactersNumber: { id: "module.tools.notesEditorCharactersNumber" },
  emptyNoteText: { id: "module.tools.notesEmptyNote" },
  deleteModalTitle: { id: "module.tools.notesDeleteModalTitle" },
  deleteModalThreadText: { id: "module.tools.notesDeleteModalThreadText" },
})

export interface Note {
  date: Date
  content: string
  id: string
}

export interface NotesProps {
  notes: Note[]
  newNoteId?: string
  createNewNote: (noteCallback: NoteCallback) => void
  saveNote: (note: Note) => void
  onRemoveNotes: (ids: string[]) => void
  sortOrder: SortOrder
  changeSortOrder: (sortOrder: SortOrder) => void
}

const Notes: FunctionComponent<NotesProps> = ({
  notes,
  newNoteId,
  createNewNote,
  saveNote,
  onRemoveNotes,
  sortOrder,
  changeSortOrder,
}) => {
  const maxCharacters = 4000
  const {
    getRowStatus,
    toggleRow,
    resetRows,
    noneRowsSelected: noRowsSelected,
    allRowsSelected,
    selectedRows,
    toggleAll,
  } = useTableSelect<Note>(notes)
  const { openSidebar, closeSidebar, activeRow, sidebarOpened } =
    useTableSidebar<Note>()

  const { rejectChanges, ...textEditorHook } = useTextEditor(activeRow)
  const {
    temporaryText: { length: textLength },
  } = textEditorHook

  const remove = (ids: string[]) => {
    const title = intl.formatMessage(messages.deleteModalTitle)
    const message = {
      ...messages.deleteModalThreadText,
      values: {
        num: allRowsSelected ? -1 : ids.length,
        ...textFormatters,
      },
    }

    const onDelete = () => {
      onRemoveNotes(ids)
      resetRows()
      modalService.closeModal()
    }
    modalService.openModal(
      <DeleteModal
        title={title}
        message={message}
        onClose={resetRows}
        onDelete={onDelete}
      />
    )
  }

  const removeSelectedRows = () => remove(selectedRows.map(({ id }) => id))
  const selectionManagerVisible = selectedRows.length > 0
  const notesAvailable = notes.length > 0

  const onNewButtonClick = () => {
    createNewNote(openSidebar)
  }

  const tryToSave = () => {
    if (activeRow) {
      const content = textEditorHook.temporaryText
      const { id } = activeRow

      saveNote(makeNewNote(id, content))
    }
  }

  const handleChangesReject = () => {
    rejectChanges()
    if (newNoteId && activeRow?.id === newNoteId) {
      onRemoveNotes([newNoteId])
      closeSidebar()
    }
  }

  const toggleSortOrder = () => {
    if (sortOrder === SortOrder.Descending) {
      changeSortOrder(SortOrder.Ascending)
    } else {
      changeSortOrder(SortOrder.Descending)
    }
  }

  return (
    <>
      <FiltersWrapper>
        {selectionManagerVisible ? (
          <SelectionManager
            data-testid={NotesTestIds.SelectionElement}
            selectedItemsNumber={selectedRows.length}
            allItemsSelected={selectedRows.length === notes.length}
            onToggle={toggleAll}
            message={messages.selectionsNumber}
            checkboxSize={CheckboxSize.Small}
            buttons={[
              <ButtonComponent
                key="delete"
                labelMessage={messages.deleteButton}
                displayStyle={DisplayStyle.Link}
                Icon={Type.Delete}
                onClick={removeSelectedRows}
              />,
            ]}
          />
        ) : (
          <SearchInput
            data-testid={NotesTestIds.SearchElement}
            type={"search"}
            disabled={!notesAvailable}
            label={intl.formatMessage(
              notesAvailable ? messages.searchNotes : messages.emptyListNoNotes
            )}
            leadingIcons={[searchIcon]}
            outlined
          />
        )}
        <NewNoteButton
          displayStyle={DisplayStyle.Primary}
          size={ButtonSize.FixedBig}
          labelMessage={messages.newButton}
          onClick={onNewButtonClick}
          Icon={Type.PlusSign}
          data-testid={NotesTestIds.NewNoteButton}
          disabled={Boolean(newNoteId)}
        />
      </FiltersWrapper>

      <TableWithSidebarWrapper>
        {notesAvailable ? (
          <Table
            hideColumns={Boolean(activeRow)}
            hideableColumnsIndexes={[2, 3, 4]}
            role="list"
          >
            <Labels size={RowSize.Small}>
              <Col />
              <Col>
                <Text message={messages.note} />
              </Col>
              <Col />
              <Col
                onClick={toggleSortOrder}
                data-testid={NotesTestIds.SortColumn}
              >
                <Text message={messages.edited} />
                <TableSortButton sortOrder={sortOrder} />
              </Col>
              <Col />
            </Labels>
            <div data-testid={NotesTestIds.ItemsWrapper}>
              {notes.map((note) => {
                const { id, content, date } = note
                const { selected } = getRowStatus(note)
                const { getTemporaryValue } = useTemporaryStorage<string>(
                  id,
                  content
                )

                const editedNote =
                  normalizeText(getTemporaryValue()) !== normalizeText(content)

                const newNote = id === newNoteId

                const emptyNote = getTemporaryValue().length === 0
                const text = emptyNote
                  ? intl.formatMessage(messages.emptyNoteText)
                  : (editedNote
                      ? getTemporaryValue()
                      : normalizeText(content)
                    ).substr(0, 250)

                const toggle = () => {
                  if (sidebarOpened) {
                    closeSidebar()
                  }
                  toggleRow(note)
                }

                const handleTextPreviewClick = () => {
                  noRowsSelected ? openSidebar(note) : toggle()
                }

                const removeNote = () => remove([id])

                return (
                  <Row
                    key={id}
                    data-testid={NotesTestIds.Note}
                    active={activeRow?.id === id}
                    role="listitem"
                  >
                    <Col>
                      <Checkbox
                        data-testid={NotesTestIds.Checkbox}
                        checked={selected}
                        onChange={toggle}
                        size={CheckboxSize.Small}
                        visible={!noRowsSelected}
                      />
                    </Col>
                    <TextPreview onClick={handleTextPreviewClick}>
                      <TextCut displayStyle={TextDisplayStyle.Paragraph1}>
                        {emptyNote ? <em>{text}</em> : text}
                      </TextCut>
                    </TextPreview>
                    <Col>
                      {(editedNote || newNote) && (
                        <TextInfo>
                          {newNote && (
                            <>
                              <em>{intl.formatMessage(messages.newNote)}</em>
                              <br />
                            </>
                          )}
                          <em>{intl.formatMessage(messages.unsavedNote)}</em>
                        </TextInfo>
                      )}
                    </Col>
                    <Col onClick={noop}>
                      <Text displayStyle={TextDisplayStyle.Paragraph1}>
                        {isToday(date)
                          ? intl.formatMessage(messages.today)
                          : moment(date).format("ll")}
                      </Text>
                    </Col>
                    <DeleteCol onClick={removeNote}>
                      <Icon type={Type.Delete} width={IconSize.Medium} />
                    </DeleteCol>
                  </Row>
                )
              })}
            </div>
          </Table>
        ) : (
          <EmptyState
            title={messages.emptyListTitle}
            description={messages.emptyListNoNotes}
            data-testid={NotesTestIds.Empty}
          />
        )}
        <NotesSidebar
          show={Boolean(activeRow)}
          onClose={closeSidebar}
          data-testid={NotesTestIds.NewNoteSidebar}
        >
          {activeRow && (
            <TextEditor
              {...textEditorHook}
              onChangesReject={handleChangesReject}
              statsInfoError={textLength > maxCharacters}
              statsInfo={intl.formatMessage(messages.charactersNumber, {
                currentCharacters: textLength,
                maxCharacters,
              })}
              autoFocus={newNoteId === activeRow?.id}
              onChangesSave={tryToSave}
            />
          )}
        </NotesSidebar>
      </TableWithSidebarWrapper>
    </>
  )
}

export default Notes
