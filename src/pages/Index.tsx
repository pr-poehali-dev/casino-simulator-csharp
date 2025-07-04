import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [balance, setBalance] = useState(10000);
  const [activeGame, setActiveGame] = useState("main");
  const [requestAmount, setRequestAmount] = useState("");
  const [pokerHand, setPokerHand] = useState([
    "A♠",
    "K♠",
    "Q♠",
    "J♠",
    "10♠",
  ]);
  const [blackjackHand, setBlackjackHand] = useState(["A♥", "K♦"]);
  const [dealerHand, setDealerHand] = useState(["?", "7♣"]);

  const handleCurrencyRequest = () => {
    if (requestAmount && Number(requestAmount) > 0) {
      setBalance((prev) => prev + Number(requestAmount));
      setRequestAmount("");
    }
  };

  const GameCard = ({
    title,
    description,
    icon,
    onClick,
    disabled = false,
  }) => (
    <Card
      className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
        disabled
          ? "border-gray-600 opacity-50"
          : "border-yellow-500/20 hover:border-yellow-500/50"
      } bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700`}
      onClick={onClick}
    >
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-4 bg-yellow-500/10 rounded-full w-16 h-16 flex items-center justify-center">
          <Icon name={icon} size={32} className="text-yellow-500" />
        </div>
        <CardTitle className="text-white font-bold text-xl">{title}</CardTitle>
        <CardDescription className="text-gray-300">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button
          variant="outline"
          className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
          disabled={disabled}
        >
          {disabled ? "Скоро" : "Играть"}
        </Button>
      </CardContent>
    </Card>
  );

  const PlayingCard = ({ card, hidden = false }) => (
    <div
      className={`relative w-16 h-24 rounded-lg flex items-center justify-center text-sm font-bold border-2 ${
        hidden
          ? "bg-red-900 border-red-700"
          : "bg-white border-gray-300 text-black"
      }`}
    >
      {hidden ? "?" : card}
    </div>
  );

  if (activeGame === "poker") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="outline"
              onClick={() => setActiveGame("main")}
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Главное меню
            </Button>
            <Badge
              variant="outline"
              className="border-yellow-500 text-yellow-500 text-lg px-4 py-2"
            >
              Баланс: {balance.toLocaleString()} ₽
            </Badge>
          </div>

          <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-3xl">Покер</CardTitle>
              <CardDescription className="text-green-200">
                Техасский Холдем
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-white text-xl mb-4">Ваша рука</h3>
                <div className="flex justify-center gap-2">
                  {pokerHand.map((card, index) => (
                    <PlayingCard key={index} card={card} />
                  ))}
                </div>
                <Badge
                  variant="outline"
                  className="mt-4 border-yellow-500 text-yellow-500"
                >
                  Флеш-Роял ♠
                </Badge>
              </div>

              <div className="flex justify-center gap-4">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8">
                  Ставка 1000 ₽
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8">
                  Фолд
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8">
                  Колл
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (activeGame === "blackjack") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="outline"
              onClick={() => setActiveGame("main")}
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Главное меню
            </Button>
            <Badge
              variant="outline"
              className="border-yellow-500 text-yellow-500 text-lg px-4 py-2"
            >
              Баланс: {balance.toLocaleString()} ₽
            </Badge>
          </div>

          <Card className="bg-gradient-to-br from-red-900 to-red-800 border-red-700">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-3xl">Блекджек</CardTitle>
              <CardDescription className="text-red-200">
                До 21 и не больше
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center">
                <h3 className="text-white text-xl mb-4">Дилер</h3>
                <div className="flex justify-center gap-2">
                  {dealerHand.map((card, index) => (
                    <PlayingCard
                      key={index}
                      card={card}
                      hidden={card === "?"}
                    />
                  ))}
                </div>
                <Badge
                  variant="outline"
                  className="mt-4 border-gray-400 text-gray-400"
                >
                  Счет: ?
                </Badge>
              </div>

              <div className="text-center">
                <h3 className="text-white text-xl mb-4">Ваши карты</h3>
                <div className="flex justify-center gap-2">
                  {blackjackHand.map((card, index) => (
                    <PlayingCard key={index} card={card} />
                  ))}
                </div>
                <Badge
                  variant="outline"
                  className="mt-4 border-yellow-500 text-yellow-500"
                >
                  Счет: 21 (Блекджек!)
                </Badge>
              </div>

              <div className="flex justify-center gap-4">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8">
                  Взять карту
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8">
                  Стоп
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8">
                  Удвоить
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4">
            ROYAL CASINO
          </h1>
          <p className="text-xl text-gray-300">Премиальное игровое заведение</p>
          <Badge
            variant="outline"
            className="mt-4 border-yellow-500 text-yellow-500 text-lg px-6 py-2"
          >
            <Icon name="Coins" size={20} className="mr-2" />
            Баланс: {balance.toLocaleString()} ₽
          </Badge>
        </header>

        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
            <TabsTrigger
              value="games"
              className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              Игры
            </TabsTrigger>
            <TabsTrigger
              value="wallet"
              className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              Кошелек
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GameCard
                title="Покер"
                description="Техасский Холдем для профессионалов"
                icon="Spade"
                onClick={() => setActiveGame("poker")}
              />
              <GameCard
                title="Блекджек"
                description="Классическая игра до 21"
                icon="Heart"
                onClick={() => setActiveGame("blackjack")}
              />
              <GameCard
                title="Рулетка"
                description="Европейская рулетка"
                icon="RotateCcw"
                disabled
              />
              <GameCard
                title="Баккара"
                description="Игра для VIP игроков"
                icon="Diamond"
                disabled
              />
            </div>

            <Card className="bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-yellow-500 text-center">
                  🏆 Таблица лидеров
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-yellow-500 text-black">1</Badge>
                      <span className="text-white font-semibold">
                        Игрок_007
                      </span>
                    </div>
                    <span className="text-yellow-500 font-bold">
                      2,500,000 ₽
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-gray-400 text-black">2</Badge>
                      <span className="text-white font-semibold">
                        Казино_Кинг
                      </span>
                    </div>
                    <span className="text-yellow-500 font-bold">
                      1,800,000 ₽
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-amber-600 text-black">3</Badge>
                      <span className="text-white font-semibold">
                        Удача_2024
                      </span>
                    </div>
                    <span className="text-yellow-500 font-bold">
                      1,200,000 ₽
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-6">
            <Card className="bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-yellow-500 flex items-center gap-2">
                  <Icon name="Wallet" size={24} />
                  Мой кошелек
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-500 mb-2">
                    {balance.toLocaleString()} ₽
                  </div>
                  <p className="text-gray-300">Текущий баланс</p>
                </div>

                <div className="flex justify-center gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-6">
                        <Icon name="Plus" size={20} className="mr-2" />
                        Пополнить
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-yellow-500">
                          Заявка на пополнение
                        </DialogTitle>
                        <DialogDescription className="text-gray-300">
                          Укажите сумму для пополнения счета
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="amount" className="text-white">
                            Сумма (₽)
                          </Label>
                          <Input
                            id="amount"
                            type="number"
                            value={requestAmount}
                            onChange={(e) => setRequestAmount(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="Введите сумму"
                          />
                        </div>
                        <Button
                          onClick={handleCurrencyRequest}
                          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                        >
                          Отправить заявку
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold px-6"
                  >
                    <Icon name="ArrowDown" size={20} className="mr-2" />
                    История
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-yellow-500">
                  Статистика игр
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-1">24</div>
                    <div className="text-gray-300 text-sm">Игр сыграно</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-green-500 mb-1">
                      67%
                    </div>
                    <div className="text-gray-300 text-sm">Процент побед</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Прогресс уровня</span>
                    <span className="text-yellow-500">Уровень 5</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-yellow-500 flex items-center gap-2">
                  <Icon name="Settings" size={24} />
                  Настройки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-white">Звуковые эффекты</span>
                    <Button variant="outline" size="sm">
                      Включено
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-white">Автоматическая игра</span>
                    <Button variant="outline" size="sm">
                      Выключено
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="text-white">Уведомления</span>
                    <Button variant="outline" size="sm">
                      Включено
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-600">
                  <h3 className="text-yellow-500 font-semibold mb-3">
                    Ответственная игра
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                    >
                      Установить лимиты
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      Самоисключение
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
