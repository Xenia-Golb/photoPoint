import { useState, useEffect, useCallback } from "react";
import {
  TextField,
  MenuItem,
  Box,
  Slider,
  Typography,
  Button,
  Stack,
  Chip,
  Paper,
  Skeleton,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/redux/hooks";
import {
  setSearchQuery,
  setCategory,
  setPriceRange,
  resetFilters,
  selectCurrentSearch,
  selectCurrentCategory,
  selectCurrentPriceRange,
} from "../app/redux/slices/filterSlice";
import { useGetCategoriesQuery } from "../app/redux/slices/apiSlice";
import debounce from "lodash.debounce";

export const ProductFilters = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectCurrentSearch);
  const category = useAppSelector(selectCurrentCategory);
  const priceRange = useAppSelector(selectCurrentPriceRange);

  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesQuery();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch(setSearchQuery(query));
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    debouncedSearch(value);
  };

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    dispatch(setPriceRange(newValue as [number, number]));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    debouncedSearch("");
  };

  const hasActiveFilters = Boolean(
    searchQuery || category || priceRange[0] > 0 || priceRange[1] < 1000
  );

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Stack spacing={3}>
        <TextField
          label="Поиск товаров"
          variant="outlined"
          fullWidth
          value={localSearch}
          onChange={handleSearchChange}
          InputProps={{
            type: "search",
          }}
        />
        {isCategoriesLoading ? (
          <Skeleton variant="rectangular" height={56} />
        ) : isCategoriesError ? (
          <Typography color="error">Ошибка загрузки категорий</Typography>
        ) : (
          <TextField
            select
            label="Категория"
            value={category || ""}
            onChange={(e) => dispatch(setCategory(e.target.value || null))}
            fullWidth
          >
            <MenuItem value="">Все категории</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </MenuItem>
            ))}
          </TextField>
        )}

        <Box>
          <Typography gutterBottom>
            Диапазон цен: ${priceRange[0]} - ${priceRange[1]}
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            step={10}
            marks={[
              { value: 0, label: "$0" },
              { value: 1000, label: "$1000" },
            ]}
          />
        </Box>
        {hasActiveFilters && (
          <Button
            variant="outlined"
            onClick={handleReset}
            fullWidth
            sx={{ mt: 2 }}
          >
            Сбросить все фильтры
          </Button>
        )}
        {(searchQuery ||
          category ||
          priceRange[0] > 0 ||
          priceRange[1] < 1000) && (
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {searchQuery && (
              <Chip
                label={`Поиск: "${searchQuery}"`}
                onDelete={() => {
                  dispatch(setSearchQuery(""));
                  setLocalSearch("");
                }}
              />
            )}
            {category && (
              <Chip
                label={`Категория: ${category}`}
                onDelete={() => dispatch(setCategory(null))}
              />
            )}
            {(priceRange[0] > 0 || priceRange[1] < 1000) && (
              <Chip
                label={`Цена: $${priceRange[0]} - $${priceRange[1]}`}
                onDelete={() => dispatch(setPriceRange([0, 1000]))}
              />
            )}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};
