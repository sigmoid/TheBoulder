import { Counter } from "./components/Counter";
import EditConversation from "./components/EditConversation";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { TestApi } from "./components/TestApi"

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/test-api',
        element: <TestApi/>
    },
    {
        path: '/edit-conversation',
        element: <EditConversation/>
    }
];

export default AppRoutes;
