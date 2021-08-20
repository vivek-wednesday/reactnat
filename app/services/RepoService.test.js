import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from 'app/utils/apiUtils';
import { getRepos } from './RepoService';

describe('RepoService tests', () => {
  it('should make the api call to "/search/repositories?q="', async () => {
    const type = 'github';
    const mock = new MockAdapter(getApiClient(type).axiosInstance);
    const data = {
      fullName: 'react'
    };
    // console.log(mock.onGet(`/search/repositories?q=${repoName}`).reply(400, data))
    mock.onGet('/search/repositories?q=undefined').reply(400, data);
    const res = await getRepos();
    expect(res.data).toEqual(data);
  });
});
