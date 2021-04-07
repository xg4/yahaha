import Link from 'next/link';

export default function Login() {
  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="rounded-lg sm:border-2 px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
          <form className="text-center">
            <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
              登录
            </h1>
            <div className="py-2 text-left">
              <input
                type="email"
                className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                placeholder="用户名 / 邮箱"
              />
            </div>
            <div className="py-2 text-left">
              <input
                type="password"
                className="bg-gray-200 border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                placeholder="密码"
              />
            </div>
            <div className="py-2">
              <button
                type="submit"
                className="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700"
              >
                登录
              </button>
            </div>
          </form>
          <div className="text-center">
            <a href="#" className="hover:underline">
              忘记密码？
            </a>
          </div>
          <div className="text-center mt-12">
            <span>没有账号？</span>
            <Link href="/join">
              <a className="font-light text-md text-indigo-600 underline font-semibold hover:text-indigo-800">
                创建
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
