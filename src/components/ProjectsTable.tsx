"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { ChevronDownIcon, CopyIcon, File, SearchIcon } from "lucide-react";
import { getProjects } from "@/actions/projects/getProjects";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Project } from "@prisma/client";
import useFetchProjects from "@/lib/hooks/useFetchProjects";

// type Project = {
//   id: string;
//   title: string;
//   theme: string;
//   creator: { name: string; email: string };
//   admins: string[];

//   // ... add other properties as needed
// };

type column = {
  id: string;
  title: string;
  theme: string;
  creator: { name: string; email: string };
  admins: string[];
  actions: string;
  // ... add other properties as needed
};

const INITIAL_VISIBLE_COLUMNS = ["title", "id", "actions"];

// Sample columns
const columns = [
  { uid: "title", name: "Title", sortable: true },
  { uid: "id", name: "ID", sortable: true },
  { uid: "actions", name: "Actions", sortable: false },

  // ... add other columns as needed
];

// Sample status options
const statusOptions = [
  { uid: "active", name: "Active" },
  { uid: "paused", name: "Paused" },
  { uid: "vacation", name: "Vacation" },
  // ... add other status options as needed
];

export default function ProjectsTable() {
  const [projects, isLoading] = useFetchProjects();

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<{
    column: string;
    direction: string;
  }>({
    column: "id",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    const projectColumns = [
      { uid: "title", name: "Title", sortable: true },
      { uid: "id", name: "ID", sortable: true },
      { uid: "actions", name: "Actions", sortable: true },

      // ... add other columns as needed
    ];

    if ((visibleColumns as unknown as string) === "all") return projectColumns;

    return projectColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const renderCell = React.useCallback(
    (project: Project, columnKey: keyof column) => {
      switch (columnKey) {
        case "title":
          return (
            <div className="w-full capitalize flex gap-3 justify-start items-center">
              <span
                style={{ background: `${project.theme}` }}
                className="h-[1rem] w-[1rem] rounded-full"
              ></span>
              <p className="w-fit"> {project[columnKey]}</p>
            </div>
          );
        case "id":
          const handleCopyId = () => {
            const textField = document.createElement("textarea");
            textField.innerText = project.id;
            document.body.appendChild(textField);
            textField.select();
            document.execCommand("copy");
            textField.remove();
          };

          return (
            <div className="cursor-pointer w-fit gap-3 group  flex justify-start items-center">
              <p className=""> {project.id}</p>
              <CopyIcon
                size={18}
                onClick={handleCopyId}
                className="group-hover:opacity-100 opacity-0 transition-opacity duration-300"
              />
            </div>
          );
        case "actions":
          return (
            <div className="w-full h-full">
              <Button
                href={`/dashboard/project/${project.id}`}
                as={Link}
                color="primary"
                variant="solid"
              >
                View
              </Button>
            </div>
          );
        // ... add cases for other columns as needed
        default:
          return project[columnKey];
      }
    },
    []
  );

  const onNextPage = React.useCallback(() => {
    if (page < Math.ceil(projects.length / rowsPerPage)) {
      setPage(page + 1);
    }
  }, [page, projects.length, rowsPerPage]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback(
    (value: React.SetStateAction<string>) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    },
    []
  );

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="max-w-[40rem] w-full">
            <Input
              variant="faded"
              radius="full"
              isClearable
              classNames={{
                base: ["max-w-[40rem]"],
                inputWrapper: ["bg-white", "dark:bg-stone-700"],
              }}
              placeholder="Search by name..."
              labelPlacement="outside"
              startContent={<SearchIcon size={18} />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          </div>
          <div className="gap-3 items-center hidden sm:flex">
            <p className="">filter by:</p>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-sm" />}
                  variant="ghost"
                  color="default"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter as (keys: Selection) => void}
              >
                {" "}
                {statusOptions.map(
                  (status: { uid: string | number | undefined; name: any }) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {status.name}
                    </DropdownItem>
                  )
                )}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-sm" />}
                  variant="faded"
                  color="default"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={
                  setVisibleColumns as (keys: Selection) => any
                }
              >
                {columns.map(
                  (column: { uid: string | number | undefined; name: any }) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {column.name}
                    </DropdownItem>
                  )
                )}{" "}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-sm">
            {projects.length} projects
          </span>
          <label className="flex items-center text-default-400 text-sm">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-sm"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    statusFilter,
    visibleColumns,
    projects.length,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-sm text-default-400">
          {(selectedKeys as unknown as string) === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${projects.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={Math.ceil(projects.length / rowsPerPage)}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={Math.ceil(projects.length / rowsPerPage) === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={Math.ceil(projects.length / rowsPerPage) === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    projects.length,
    page,
    rowsPerPage,
    onPreviousPage,
    onNextPage,
  ]);

  return (
    <div className="w-full">
      <Table
        aria-label="Projects table with custom cells, pagination and sorting "
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        sortDescriptor={setSortDescriptor as SortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys as (e: Selection) => void}
        onSortChange={setSortDescriptor as (e: SortDescriptor) => void}
        className=""
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn key={column.uid} allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          className="flex justify-between"
          emptyContent={"No projects found"}
          items={projects}
          isLoading={isLoading as boolean}
          loadingContent={<div className="">loading</div>}
        >
          {(item: Project) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof column)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
