import DashboardService from "./../services/DashboardService";
import ProductService from "./../services/ProductService";
import BarChart from "./../components/charts/BarChart";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Chip,
} from "@material-tailwind/react";
import {
  CurrencyDollarIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";

const Dashboard = () => {
  const [totalRevenueValue, setTotalRevenueValue] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [totalStockValue, setTotalStockValue] = useState(0);
  const [totalProfitValue, setTotalProfitValue] = useState(0);
  const [productsPerCategory, setProductsPerCategory] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [totalMonthlyRevenue, setTotalMonthlyRevenue] = useState([]);
  const [totalMonthlyProfit, setTotalMonthlyProfit] = useState([]);
  const [avgOrderValue, setAvgOrderValue] = useState(0);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [monthlyRevenueData, setMonthlyRevenueData] = useState({
    labels: [],
    datasets: [],
  });
  const [productsPerCategoryData, setProductsPerCategoryData] = useState({
    labels: [],
    datasets: [],
  });

  const [topSellingProductsData, setTopSellingProductsData] = useState({
    labels: [],
    datasets: [],
  });
  const [monthlyProfitData, setMonthlyProfitData] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const endDate = today.toISOString().split("T")[0];
      const startDate = new Date(today.setDate(today.getDate() - 365))
        .toISOString()
        .split("T")[0];

      try {
        const fetchedData = await Promise.all([
          DashboardService.getTotalRevenue(startDate, endDate),
          DashboardService.getTotalProfit(startDate, endDate),
          DashboardService.getTopSellingProducts(startDate, endDate),
          DashboardService.getAverageOrderServiceValue(startDate, endDate),
          DashboardService.getTotalMonthlyRevenue(),
          DashboardService.getTotalMonthlyProfit(),
          DashboardService.getTotalStock(),
          DashboardService.getTotalStockValue(),
          DashboardService.getProductsPerCategory(),
        ]);
        const [
          totalRevenueValue,
          totalProfitValue,
          topSellingProducts,
          avgOrderValue,
          totalMonthlyRevenue,
          totalMonthlyProfit,
          totalStock,
          totalStockValue,
          productsPerCategory,
        ] = fetchedData.map((response) => response.data);

        setTotalRevenueValue(totalRevenueValue);
        setTotalProfitValue(totalProfitValue);
        setTopSellingProducts(topSellingProducts);
        setAvgOrderValue(avgOrderValue.toFixed(0));
        setTotalMonthlyRevenue(totalMonthlyRevenue);
        setTotalMonthlyProfit(totalMonthlyProfit);
        setTotalStock(totalStock);
        setTotalStockValue(totalStockValue);
        setProductsPerCategory(productsPerCategory);
        setIsDataFetched(true);
        try {
          //Top selling products
          topSellingProducts.forEach(async (product) => {
            const productData = await ProductService.getProductById(
              product.productId
            );
            const productName = productData.data.name;
            product.productName = productName;

            const formattedData = {
              labels: topSellingProducts.map((product) => product.productName),
              datasets: [
                {
                  label: "Total Quantity Sold",
                  data: topSellingProducts.map(
                    (product) => product.totalQuantity
                  ),
                  backgroundColor: ["black"],
                  borderColor: ["gray"],
                  borderWidth: 1,
                },
              ],
            };
            setTopSellingProductsData(formattedData);
          });

          //Monthly Profit
          totalMonthlyProfit.forEach(async (monthlyRevenue) => {
            const formattedData = {
              labels: totalMonthlyProfit.map(
                (monthlyRevenue) => monthlyRevenue.month
              ),
              datasets: [
                {
                  label: "Total Profit",
                  data: totalMonthlyProfit.map(
                    (monthlyRevenue) => monthlyRevenue.profit
                  ),
                  backgroundColor: ["black"],
                  borderColor: ["gray"],
                  borderWidth: 1,
                },
              ],
            };
            setMonthlyProfitData(formattedData);
          });

          //Monthly Revenue
          totalMonthlyRevenue.forEach(async (monthlyRevenue) => {
            const formattedData = {
              labels: totalMonthlyRevenue.map(
                (monthlyRevenue) => monthlyRevenue.month
              ),
              datasets: [
                {
                  label: "Total Revenue",
                  data: totalMonthlyRevenue.map(
                    (monthlyRevenue) => monthlyRevenue.revenue
                  ),
                  backgroundColor: ["black"],
                  borderColor: ["gray"],
                  borderWidth: 1,
                },
              ],
            };
            setMonthlyRevenueData(formattedData);
          });

          //Products per category
          productsPerCategory.forEach(async (item) => {
            const formattedData = {
              labels: productsPerCategory.map((item) => item.name),
              datasets: [
                {
                  label: "Category",
                  data: productsPerCategory.map((item) => item.productCount),
                  backgroundColor: [
                    "#e0e0e0", // Very light gray
                    "#212121", // Dark gray
                    "#333333", // Medium gray
                    "#777777", // Light gray
                    "#555555", // Gray
                    "#cccccc", // Light silver
                    "#f5f5f5", // Off-white
                    "#ebebeb", // Eggshell white
                    "#dddddd", // Light gray (alternative)
                    "#cccccc", // Gray (alternative)
                    "#b3b3b3", // Light gray (alternative)
                  ],
                  borderColor: ["black"],
                  borderWidth: 1,
                },
              ],
            };
            setProductsPerCategoryData(formattedData);
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 align-middle justify-center">
        <Card className="h-32 bg-white">
          <CardBody>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 align-middle text-black text-sm "
            >
              Average Order Value
            </Typography>
            <div className="  flex justify-center   ">
              <Chip
                value={avgOrderValue}
                variant="outlined"
                icon={<CurrencyDollarIcon />}
                className="text-black border-2 text-sm w-28 "
              />
            </div>
          </CardBody>
        </Card>
        <Card className="h-32 bg-white">
          <CardBody>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 align-middle text-black text-sm "
            >
              Total Stock
            </Typography>
            <div className="  flex justify-center   ">
              <Chip
                value={totalStock}
                variant="outlined"
                icon={<ArchiveBoxIcon />}
                className="text-black border-2 text-sm w-28 "
              />
            </div>
          </CardBody>
        </Card>
        <Card className="h-32 bg-white border-2 shadow-lg">
          <CardBody>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 align-middle text-black text-sm "
            >
              Stock Value
            </Typography>
            <div className="  flex justify-center   ">
              <Chip
                value={totalStockValue}
                variant="outlined"
                icon={<CurrencyDollarIcon />}
                className="text-black border-2 text-sm w-28 "
              />
            </div>
          </CardBody>
        </Card>
        <Card className="h-32 bg-black">
          <CardBody>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 align-middle text-white text-base"
            >
              Yearly Revenue
            </Typography>
            <div className="  flex justify-center   ">
              <Chip
                value={totalRevenueValue}
                variant="gradient"
                icon={<CurrencyDollarIcon />}
                className="text-white text-sm w-28 "
              />
            </div>
          </CardBody>
        </Card>
        <Card className="h-32 bg-black">
          <CardBody>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 align-middle text-white text-base"
            >
              Yearly Profit
            </Typography>
            <div className="  flex justify-center   ">
              <Chip
                value={totalProfitValue}
                variant="gradient"
                icon={<CurrencyDollarIcon />}
                className="text-white text-sm w-28 "
              />
            </div>
          </CardBody>
        </Card>
      </div>
      {/* <div className="flex justify-center align-middle  gap-8 content-center"> */}
      <div className="flex gap-6">
        <Card className="mt-6 w-3/5">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Monthly Revenue
            </Typography>
            <LineChart chartData={monthlyRevenueData} />
          </CardBody>
        </Card>
        <Card className="mt-6 w-2/5 ">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Products By Category
            </Typography>
            <PieChart chartData={productsPerCategoryData} />
          </CardBody>
        </Card>
      </div>
      <div className="flex gap-6">
        <Card className="mt-6 w-3/5">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Monthly Profit
            </Typography>
            <LineChart chartData={monthlyProfitData} />
          </CardBody>
        </Card>
        <Card className="mt-6 w-2/5">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-10">
              Top Selling Products
            </Typography>
            <BarChart chartData={topSellingProductsData} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
