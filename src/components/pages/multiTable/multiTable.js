/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';

// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CustomTextField from 'utils/textfield';
import { Trash, Edit2, FilterSearch, DiscountShape, Additem } from 'iconsax-react';

// third-party
import { useTable, useFilters, usePagination } from 'react-table';
import { Formik } from 'formik';

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
import { CSVExport, TablePagination, EmptyTable, HeaderSort, HidingSelect } from 'helpers/third-party/ReactTable';
import { useGlobalFilter } from 'react-table/dist/react-table.development';
import { useSortBy } from 'react-table';
import DialogBox from 'components/atoms/dialog/dialog';
import './multiTable.css';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({
  columns,
  data,
  formValues,
  formValueFields,
  validationSchema,
  changeTableVisibility,
  setEditing,
  schemeEditing,
  getOneItem,
  deleteOneItem,
  setSearchData,
  tableDataRefetch,
  setActiveEditing,
  isEditingInterestRateButton,
  isEditingInterestRate,
  VisibleColumn
}) {
  // const filterTypes = useMemo(() => renderFilterTypes, []);
  // const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);
  // const initialState = useMemo(() => ({ filters: [{ id: 'status', value: '' }] }), []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    gotoPage,
    setPageSize,
    setHiddenColumns,
    allColumns,
    state: { pageIndex, pageSize, globalFilter, hiddenColumns },
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
        ],
        hiddenColumns: columns.filter((col) => VisibleColumn.includes(col.accessor)).map((col) => col.accessor)
      }
      // defaultColumn,
      // filterTypes
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );
  const sortingRow = rows.slice(0, 10);
  const theme = useTheme();
  const mdUp = theme.breakpoints.up('md');
  console.log(mdUp);

  // For Delete Item
  const [item, setItem] = useState();
  // For Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };
  // For Column Hiding
  let headers = [];
  allColumns.map((item) => {
    if (!hiddenColumns?.includes(item.id)) {
      headers.push({ label: item.Header, key: item.id });
    }
    return item;
  });

  return (
    <>
      <Grid container alignItems="center" spacing={2} sx={{ padding: 2 }}>
        <Grid item md={7} sm={7} xs={12}>
          {formValueFields?.length >= 1 && (
            <Formik
              initialValues={formValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
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
                >
                  <Grid container direction="row" spacing={1} alignItems="center">
                    {formValueFields?.map((field, id) => {
                      return (
                        <Grid item md={4} sm={4} xs={6} key={id}>
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

                    <Grid item md={4} sm={4} xs={6}>
                      <Button
                        // fullWidth={!mdUp}
                        variant="contained"
                        color="success"
                        type="submit"
                        startIcon={<FilterSearch />}
                        sx={{
                          justifySelf: 'center',
                          width: !mdUp ? 'auto' : '100%' // Set width to 'auto' when screen size is medium or larger, otherwise '100%'
                        }}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Formik>
          )}
        </Grid>
        <Grid item md={5} sm={5} xs={12} sx={{ display: 'flex', justifyContent: { sm: 'flex-end' } }}>
          {/* <Stack direction="row" spacing={2} alignItems="center">
            <CSVExport data={rows.map((d) => d.original)} filename={'filtering-table.csv'} headers={headers} />
            <HidingSelect hiddenColumns={hiddenColumns} setHiddenColumns={setHiddenColumns} allColumns={allColumns} />
          </Stack> */}
          <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <Grid item md={7} xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CSVExport data={rows.map((d) => d.original)} filename={'filtering-table.csv'} headers={headers} />
            </Grid>
            <Grid item md={5} xs={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <HidingSelect hiddenColumns={hiddenColumns} setHiddenColumns={setHiddenColumns} allColumns={allColumns} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {item && (
        <DialogBox
          openDialog={openDialog}
          handleOpenDialog={handleOpenDialog}
          dataRefetch={tableDataRefetch}
          item={item}
          deleteOneItem={deleteOneItem}
        />
      )}

      <Box sx={{ width: '100%', overflowX: 'auto', display: 'block' }}>
        <Table {...getTableProps()}>
          <TableHead sx={{ borderTopWidth: top ? 2 : 1 }}>
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell key={column} cell={column} {...column.getHeaderProps([{ className: column.className }])}>
                    <HeaderSort column={column} sort />
                  </TableCell>
                ))}
                <TableCell width={150} sx={{ textAlign: 'right' }}>
                  Actions
                </TableCell>
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
                    <TableCell sx={{ textAlign: { md: 'right', xs: 'center' } }}>
                      <Grid container spacing={0.5} sx={{ display: 'flex', justifyContent: { md: 'flex-end', xs: 'center' } }}>
                        <Grid item md={4} xs={12}>
                          <Edit2
                            size={22}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              changeTableVisibility();
                              setEditing(row.original);
                              setActiveEditing();
                            }}
                          />
                        </Grid>

                        {isEditingInterestRateButton && (
                          <Grid item md={4} xs={12}>
                            <DiscountShape
                              size={22}
                              style={{ cursor: 'pointer' }}
                              onClick={async () => {
                                setEditing(row.original);
                                isEditingInterestRate();
                              }}
                            />
                          </Grid>
                        )}

                        <Grid item md={4} xs={12}>
                          <Trash
                            size={22}
                            style={{ cursor: 'pointer' }}
                            onClick={async () => {
                              setItem(row.original);
                              setTimeout(() => {
                                handleOpenDialog();
                              }, 200);
                              console.log(row.original);
                            }}
                          />
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <EmptyTable msg="No Data" colSpan={columns.length + 1} />
            )}

            {/* <TableRow>
              <TableCell sx={{ p: 2 }} colSpan={7}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </Box>
      <Box sx={{ p: 2, borderTop: '1px solid #dbe0e5a6' }}>
        <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
      </Box>
    </>
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
  schemeEditing,
  getOneItem,
  deleteOneItem,
  setSearchData,
  tableDataRefetch,
  setActiveEditing,
  isEditingInterestRateButton,
  isEditingInterestRate,
  VisibleColumn
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
          schemeEditing={schemeEditing}
          getOneItem={getOneItem}
          deleteOneItem={deleteOneItem}
          setSearchData={setSearchData}
          tableDataRefetch={tableDataRefetch}
          setActiveEditing={setActiveEditing}
          isEditingInterestRateButton={isEditingInterestRateButton}
          isEditingInterestRate={isEditingInterestRate}
          VisibleColumn={VisibleColumn}
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
  schemeEditing: PropTypes.any,
  getOneItem: PropTypes.any,
  deleteOneItem: PropTypes.any,
  setSearchData: PropTypes.any,
  tableDataRefetch: PropTypes.any,
  setActiveEditing: PropTypes.any,
  // Add new table for below
  isEditingInterestRateButton: PropTypes.any,
  isEditingInterestRate: PropTypes.any,
  VisibleColumn: PropTypes.any
};

export default MultiTable;

// const autocompleteData = [
//   { product_type_id: 1, product_type: 'Electronics', is_active: true, is_deleted: false },
//   { product_type_id: 2, product_type: 'Clothing', is_active: true, is_deleted: false }
// ];
