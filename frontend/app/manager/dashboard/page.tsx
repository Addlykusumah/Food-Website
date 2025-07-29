import { Card, CardContent } from "@/components/Ui/card";
import { Button } from "@/components/Ui/button";
import { Progress } from "@/components/Ui/progress";
import { RevenueChart, PieReport } from "@/components/Charts";
import { CheckCircle2, Clock3 } from "lucide-react";

const incomeData = [
  { name: "Jan", income: 12000, expenses: 8000 },
  { name: "Feb", income: 15000, expenses: 10000 },
  { name: "Mar", income: 17000, expenses: 9000 },
  { name: "Apr", income: 20000, expenses: 13000 },
  { name: "May", income: 193000, expenses: 95000 },
];

const pieData = [
  { name: "View Count", value: 68 },
  { name: "Sales", value: 23 },
  { name: "Percentage", value: 16 },
];

const COLORS = ["#4ade80", "#60a5fa", "#facc15"];

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
      <Card className="lg:col-span-4 bg-red-900 text-white">
        <CardContent className="p-4">
          <p className="text-sm">April 27th 2025</p>
          <h2 className="text-xl font-bold">Sales revenue increased 40% in 1 week</h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm text-gray-500">Net Income</h3>
          <p className="text-3xl font-bold">$193.000</p>
          <p className="text-sm text-green-600">+35% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm text-gray-500">Total Return</h3>
          <p className="text-3xl font-bold">$32.000</p>
          <p className="text-sm text-red-600">-24% from last month</p>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardContent className="p-4">
          <h3 className="text-lg font-bold mb-2">Transaction</h3>
          <ul className="space-y-2">
            {[
              { name: "Eos Mushroom", status: "Completed", icon: <CheckCircle2 className="text-green-500" /> },
              { name: "Eos Luibusdam", status: "Pending", icon: <Clock3 className="text-yellow-500" /> },
              { name: "Laboriosam Direva", status: "Pending", icon: <Clock3 className="text-yellow-500" /> },
              { name: "Magnam Tiste", status: "Completed", icon: <CheckCircle2 className="text-green-500" /> },
              { name: "Sweet Tropica", status: "Completed", icon: <CheckCircle2 className="text-green-500" /> },
              { name: "Green Apple", status: "Completed", icon: <CheckCircle2 className="text-green-500" /> },
              { name: "Boba Sugar", status: "Completed", icon: <CheckCircle2 className="text-green-500" /> },
            ].map((item, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="flex items-center gap-2">{item.icon} {item.name}</span>
                <span className="text-sm text-gray-500">{item.status}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
  <CardContent className="p-4">
    <h3 className="text-lg font-bold mb-2">Revenue</h3>
    <RevenueChart data={incomeData} />
    <p className="text-sm text-green-600 mt-2">+35% from last month</p>
  </CardContent>
</Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-bold mb-2">Store Report</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm">Product Launched (233)</p>
              <Progress value={60} />
            </div>
            <div>
              <p className="text-sm">Ongoing Product (23)</p>
              <Progress value={20} />
            </div>
            <div>
              <p className="text-sm">Product Sold (482)</p>
              <Progress value={80} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
  <CardContent className="p-4">
    <h3 className="text-lg font-bold mb-2">Total View Performance</h3>
    <PieReport data={pieData} />
    <p className="text-sm text-gray-500">Total Count: 565K</p>
  </CardContent>
</Card>

      <Card className="bg-red-100">
        <CardContent className="p-4">
          <h3 className="text-lg font-bold">Level up your sales managing to the next level.</h3>
          <p className="text-sm mt-1">An any way to manage sales with care and precision.</p>
          <Button className="mt-2">Update to Siohoma+</Button>
        </CardContent>
      </Card>
    </div>
  );
}
