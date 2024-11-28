using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.BusinessModule.Interfaces;
using ECommerce.Application.BusinessModule.ViewModels;
using ECommerce.Domain.BusinessModule.Entities;
using ECommerce.Infrastructure.Data;

namespace ECommerce.Infrastructure.BusinessModule.Repositories
{
    public class TeDhenatBiznesitRepository : ITeDhenatBiznesitRepository
    {
        private readonly ECommerceDBContext _context;

        public TeDhenatBiznesitRepository(ECommerceDBContext context)
        {
            _context = context;
        }

        public TeDhenatBiznesit Get()
        {
            return _context.TeDhenatBiznesit.First();
        }

        public async Task UpdateAsync(TeDhenatBiznesit biznesiData,TeDhenatBiznesitVM teDhenat)
        {
            biznesiData.EmriBiznesit = teDhenat.EmriBiznesit;
            biznesiData.EmailBiznesit = teDhenat.EmailBiznesit;
            biznesiData.NrKontaktues = teDhenat.NrKontaktit;
            biznesiData.FacebookLink = teDhenat.Facebook;
            biznesiData.TwitterLink = teDhenat.Twitter;
            biznesiData.InstagramLink = teDhenat.Instagram;
            biznesiData.LinkedInLink = teDhenat.LinkedIn;

            //_context.Update(biznesiData);
            await _context.SaveChangesAsync();
        }
    }
}
