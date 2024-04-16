import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';

// material-ui
import { Box, Chip, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, InputLabel, TextField, Button } from '@mui/material';
import { Edit } from 'iconsax-react';

// third-party
import { useTable, useFilters, usePagination } from 'react-table';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'utils/axios';

// project-imports
// import makeData from 'data/react-table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import {
  GlobalFilter,
  DefaultColumnFilter,
  SelectColumnFilter,
  SliderColumnFilter,
  NumberRangeColumnFilter,
  renderFilterTypes,
  filterGreaterThan
} from 'utils/react-table';
import { CSVExport, TablePagination, EmptyTable, HeaderSort } from 'components/third-party/ReactTable';
import { useGlobalFilter } from 'react-table/dist/react-table.development';
import AnimateButton from 'components/@extended/AnimateButton';
import { useSortBy } from 'react-table';
import { Delete } from '@mui/icons-material';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, formValues, changeTableVisibility, setEditing, setSearchData, getData }) {
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);
  const initialState = useMemo(() => ({ filters: [{ id: 'status', value: '' }] }), []);
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
  useEffect(() => {
    console.log(columns, data);
  }, [columns]);

  return (
    <Stack>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 2 }}>
        <Formik
          initialValues={{ product_type_id: '' }}
          validationSchema={Yup.object().shape({
            product_type_id: Yup.number()
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            console.log({
              ...values,
              method_name: 'getone'
            });
            const response = await axios.post('/product/getproductmethod', {
              method_name: 'getone',
              ...values
            });
            setSearchData(response.data.data);
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
              sx={{ width: '100%' }}
            >
              <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '60%' }}>
                <TextField
                  name="product_type_id"
                  type="number"
                  placeholder="Product ID"
                  value={values.product_type_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.product_type_id && Boolean(errors.product_type_id)}
                  helperText={touched.product_type_id && errors.product_type_id}
                />

                <AnimateButton>
                  <Button variant="outlined" type="submit" sx={{ justifySelf: 'center', padding: '10px 14px' }}>
                    Search
                  </Button>
                </AnimateButton>

                <AnimateButton>
                  <Button variant="outlined" type="submit" sx={{ justifySelf: 'center', padding: '10px 14px' }} onClick={() => getData()}>
                    Reset
                  </Button>
                </AnimateButton>
              </Stack>
            </Box>
          )}
        </Formik>
        {/* <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} /> */}
        <CSVExport data={rows.map((d) => d.original)} filename={'filtering-table.csv'} />
      </Stack>
      <Table {...getTableProps()}>
        <TableHead sx={{ borderTopWidth: top ? 2 : 1 }}>
          {headerGroups.map((headerGroup) => (
            <TableRow key={headerGroup} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell key={column} cell={column} {...column.getHeaderProps([{ className: column.className }])}>
                  {/* {column.render('Header')} */}
                  <HeaderSort column={column} sort />
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.length > 0 ? (
            page.map((row) => {
              prepareRow(row);
              return (
                <TableRow key={row} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell} {...cell.getCellProps([{ className: cell.column.className }])}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                  <TableCell>
                    {/* <Stack spacing={2} flexDirection={row}> */}
                    <Edit
                      style={{ marginRight: 10 }}
                      onClick={() => {
                        changeTableVisibility();
                        setEditing({ product_type_id: row.original.product_type_id, product_type: row.original.product_type });
                        // handleEdit(row.original);
                        console.log(row.original);
                      }}
                    />
                    <Delete
                      onClick={async () => {
                        await axios.post('/product/createproduct-type', {
                          product_type_id: row.original.product_type_id,
                          method_name: 'delete'
                        });
                        getData();
                        console.log(row.original);
                      }}
                    />
                    {/* </Stack> */}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <EmptyTable msg="No Data" colSpan={3} />
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

const MultiTable = ({ columns, data, formValues, changeTableVisibility, setEditing, setSearchData, getData }) => {
  return (
    <MainCard title="Pagination at Bottom" content={false} secondary={<CSVExport data={data} filename={'pagination-bottom-table.csv'} />}>
      <ScrollX>
        <ReactTable
          columns={columns}
          data={data}
          formValues={formValues}
          changeTableVisibility={changeTableVisibility}
          setEditing={setEditing}
          setSearchData={setSearchData}
          getData={getData}
        />
      </ScrollX>
    </MainCard>
  );
};

MultiTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  formValues: PropTypes.object,
  changeTableVisibility: PropTypes.func
};

export default MultiTable;

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
