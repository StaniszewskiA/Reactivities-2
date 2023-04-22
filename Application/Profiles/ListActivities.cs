using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Profiles;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<Result<List<UserActvityDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set;}
        }
        public class Handler : IRequestHandler<Query, Result<List<UserActvityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<UserActvityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.ActivityAttendees
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.Activity.Date)
                    .ProjectTo<UserActvityDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                query = request.Predicate switch
                {
                    "past" => query.Where(a => a.Date <= DateTime.Now),
                    "hosting" => query.Where(a=> a.HostUsername == request.Username),
                    _ => query.Where(a => a.Date >= DateTime.Now)
                };

                var activties = await query.ToListAsync();

                return Result<List<UserActvityDto>>.Success(activties);
            }
        }
    }
}