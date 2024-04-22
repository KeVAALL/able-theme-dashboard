/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';

// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Button, Grid } from '@mui/material';
import CustomTextField from 'utils/textfield';
import { Trash, Edit2, FilterSearch, DiscountShape, Additem } from 'iconsax-react';

// third-party
import { useTable, useFilters, usePagination } from 'react-table';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'utils/axios';

// project-imports
import MainCard from 'components/organisms/mainCard/MainCard';
import ScrollX from 'components/organisms/scrollX/ScrollX';
import {
  GlobalFilter,
  DefaultColumnFilter,
  SelectColumnFilter,
  SliderColumnFilter,
  NumberRangeColumnFilter,
  renderFilterTypes,
  filterGreaterThan
} from 'utils/react-table';
import { CSVExport, TablePagination, EmptyTable, HeaderSort } from 'helpers/third-party/ReactTable';
import { useGlobalFilter } from 'react-table/dist/react-table.development';
import { useSortBy } from 'react-table';
import { DialogBox } from 'components/atoms/dialog/dialog';
import AnimateButton from 'helpers/@extended/AnimateButton';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({
  columns,
  data,
  formValues,
  formValueFields,
  validationSchema,
  changeTableVisibility,
  setEditing,
  getOneItem,
  deleteOneItem,
  setSearchData,
  tableDataRefetch,
  setActiveEditing,
  isEditingInterestRateButton,
  isEditingInterestRate,
  showActionHeadButton,
  handleIROpenDialog
}) {
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);
  const initialState = useMemo(() => ({ filters: [{ id: 'status', value: '' }] }), []);
  // console.warn(editingInterestRate);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        sortBy: [
          {
            id: 'userName',
            desc: false
          }
        ]
      },
      defaultColumn,
      filterTypes
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );
  const sortingRow = rows.slice(0, 10);
  const autocompleteData = [
    { product_type_id: 1, product_type: 'Electronics', is_active: true, is_deleted: false },
    { product_type_id: 2, product_type: 'Clothing', is_active: true, is_deleted: false }
  ];
  const [item, setItem] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <Stack>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 2 }}>
        {formValueFields?.length >= 1 && (
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              // getOneItem(values);
              getOneItem(values, setSearchData);
              resetForm();
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Box
                component="form"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
                sx={{ width: '60%' }}
              >
                <Grid container direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
                  {formValueFields?.map((field, id) => {
                    return (
                      <Grid item xs={4} key={id}>
                        <CustomTextField
                          label={field.label}
                          name={field.fieldName}
                          values={values}
                          type={field.type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          touched={touched}
                          errors={errors}
                        />
                      </Grid>
                    );
                  })}

                  <Grid item xs={4}>
                    <Button variant="contained" color="success" type="submit" startIcon={<FilterSearch />} sx={{ justifySelf: 'center' }}>
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        )}
        <CSVExport data={rows.map((d) => d.original)} filename={'filtering-table.csv'} />
      </Stack>

      {item && (
        <DialogBox
          openDialog={openDialog}
          handleOpenDialog={handleOpenDialog}
          dataRefetch={tableDataRefetch}
          item={item}
          deleteOneItem={deleteOneItem}
        />
      )}

      <Table {...getTableProps()}>
        <TableHead sx={{ borderTopWidth: top ? 2 : 1 }}>
          {headerGroups.map((headerGroup) => (
            <TableRow key={headerGroup} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell key={column} cell={column} {...column.getHeaderProps([{ className: column.className }])}>
                  <HeaderSort column={column} sort />
                </TableCell>
              ))}
              {!showActionHeadButton && (
                <TableCell width={150} sx={{ textAlign: 'right' }}>
                  Actions
                </TableCell>
              )}
              {showActionHeadButton && (
                <TableCell width={150} sx={{ textAlign: 'right' }}>
                  <Box>
                    <AnimateButton>
                      <Button variant="contained" color="success" startIcon={<Additem />} onClick={handleIROpenDialog}>
                        Add
                      </Button>
                    </AnimateButton>
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.length > 0 && data.length > 0 ? (
            // {data?.length > 0 ? (
            page.map((row) => {
              prepareRow(row);
              return (
                <TableRow key={row} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell key={cell} {...cell.getCellProps([{ className: cell.column.className }])}>
                        {/* {cell.render('Cell')} */}
                        {cell.column.customCell ? <cell.column.customCell value={cell.value} /> : cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                  <TableCell sx={{ textAlign: 'right' }}>
                    <Edit2
                      size={22}
                      style={{ marginRight: 20, cursor: 'pointer' }}
                      onClick={() => {
                        changeTableVisibility();
                        setEditing(row.original);
                        setActiveEditing();
                        console.log(row.original);
                      }}
                    />

                    <Trash
                      size={22}
                      style={{ marginRight: 20, cursor: 'pointer' }}
                      onClick={async () => {
                        setItem(row.original);
                        setTimeout(() => {
                          handleOpenDialog();
                        }, 200);
                        console.log(row.original);
                      }}
                    />

                    {isEditingInterestRateButton && (
                      <DiscountShape
                        size={22}
                        style={{ cursor: 'pointer' }}
                        onClick={async () => {
                          isEditingInterestRate();
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <EmptyTable msg="No Data" colSpan={columns.length + 1} />
          )}

          <TableRow>
            <TableCell sx={{ p: 2 }} colSpan={7}>
              <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

// ==============================|| REACT TABLE - PAGINATION - FILTERING ||============================== //

const MultiTable = ({
  columns,
  data,
  formValues,
  formValueFields,
  validationSchema,
  changeTableVisibility,
  setEditing,
  getOneItem,
  deleteOneItem,
  setSearchData,
  tableDataRefetch,
  setActiveEditing,
  isEditingInterestRateButton,
  isEditingInterestRate,
  showActionHeadButton,
  handleIROpenDialog
}) => {
  return (
    <MainCard content={false} secondary={<CSVExport data={data} filename={'pagination-bottom-table.csv'} />}>
      <ScrollX>
        <ReactTable
          columns={columns}
          data={data}
          formValues={formValues}
          formValueFields={formValueFields}
          validationSchema={validationSchema}
          changeTableVisibility={changeTableVisibility}
          setEditing={setEditing}
          getOneItem={getOneItem}
          deleteOneItem={deleteOneItem}
          setSearchData={setSearchData}
          tableDataRefetch={tableDataRefetch}
          setActiveEditing={setActiveEditing}
          isEditingInterestRateButton={isEditingInterestRateButton}
          isEditingInterestRate={isEditingInterestRate}
          showActionHeadButton={showActionHeadButton}
          handleIROpenDialog={handleIROpenDialog}
        />
      </ScrollX>
    </MainCard>
  );
};

MultiTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  formValues: PropTypes.object,
  formValueFields: PropTypes.any,
  validationSchema: PropTypes.any,
  changeTableVisibility: PropTypes.func,
  setEditing: PropTypes.any,
  getOneItem: PropTypes.any,
  deleteOneItem: PropTypes.any,
  setSearchData: PropTypes.any,
  tableDataRefetch: PropTypes.any,
  setActiveEditing: PropTypes.any,
  isEditingInterestRateButton: PropTypes.any,
  isEditingInterestRate: PropTypes.any,
  showActionHeadButton: PropTypes.any,
  handleIROpenDialog: PropTypes.any
};

export default MultiTable;

{
  /* {column.render('Header')} */
}
// useEffect(() => {
//   console.log(columns, data);
// }, [columns]);
{
  /* {sortingRow.length > 0 ? (
            sortingRow.map((row) => {
              prepareRow(row);
              return (
                <TableRow key={row} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell} {...cell.getCellProps([{ className: cell.column.className }])}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <EmptyTable msg="No Data" colSpan={7} />
          )} */
}
