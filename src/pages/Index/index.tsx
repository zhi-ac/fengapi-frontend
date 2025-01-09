import { listInterfaceInfoByPageUsingGet } from '@/services/fengapi-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { List, message } from 'antd';
import React, { useEffect, useState } from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */

const Index: React.FC = () => {
  // 加载状态
  const [loading, setLoading] = useState(false);
  // 列表数据
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  // 总数
  const [total, setTotal] = useState<number>(0);

  // 定义异步加载数据的函数
  const loadData = async (current = 1, pageSize = 5) => {
    // 开始加载数据，设置 loading 状态为 true
    setLoading(true);
    try {
      // 调用接口获取数据
      const res = await listInterfaceInfoByPageUsingGet({
        current,
        pageSize,
      });
      // 将请求返回的数据设置到列表数据状态中
      setList(res?.data?.records ?? []);
      // 将请求返回的总数设置到总数状态中
      setTotal(res?.data?.total ?? 0);
      // 捕获请求失败的错误信息
    } catch (error: any) {
      // 请求失败时提示错误信息
      message.error('请求失败，' + error.message);
    }
    // 数据加载成功或失败后，设置 loading 状态为 false
    setLoading(false);
  };

  useEffect(() => {
    // 页面加载完成后调用加载数据的函数
    loadData();
  }, []);

  return (
    <PageContainer>
      <List
        className="mylist"
        loading={loading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          // const apiLink = `/interface_info/${item.id}`;
          <List.Item
            actions={[
              <a key={item.id} href={`/interface_info/${item.id}`}>
                查看
              </a>,
            ]}
          >
            <List.Item.Meta
              title={<a href={`/interface_info/${item.id}`}>{item.name}</a>}
              description={item.description}
            />
          </List.Item>
        )}
        // 分页配置
        pagination={{
          // 自定义显示总数
          // eslint-disable-next-line @typescript-eslint/no-shadow
          showTotal(total: number) {
            return '总数：' + total;
          },
          // 每页显示条数
          pageSize: 5,
          // 总数，从状态中获取
          total,
          // 切换页面触发的回调函数
          onChange(page, pageSize) {
            // 加载对应页面的数据
            loadData(page, pageSize);
          },
        }}
      />
    </PageContainer>
  );
};

export default Index;
