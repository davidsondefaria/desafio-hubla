import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function PaginateQueryOptions() {
  const apiOptions = [
    ApiQuery({
      name: 'page',
      required: false,
      description: 'Page number (starting from 1)',
      example: 1,
      type: 'number',
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      description: 'Number of records per page',
      example: 10,
      type: 'number',
    }),
    ApiQuery({
      name: 'sortBy',
      required: false,
      description:
        'Format: _field_:_direction_ [direction may be ASC or DESC] e.g. id:DESC',
      type: 'string',
    }),
  ];

  return applyDecorators(...apiOptions);
}
