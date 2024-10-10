import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Form, formSchema } from './validation';
import { z } from 'zod';

@Controller('/api/data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  get(@Param('id') id: string) {
    return this.appService.get(id);
  }

  @Get()
  getAll() {
    return this.appService.getAll();
  }

  @Post('create')
  async create(@Body() formData: Form) {
    try {
      // Validate the incoming data against the schema
      const validatedData = formSchema.parse(formData);

      // Process the form data (you can add your logic here)
      const result = await this.appService.create(validatedData);

      return {
        success: true,
        message: 'Form submitted successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        // If it's a validation error, return the error messages
        return {
          success: false,
          message: 'Validation failed',
          errors: error.errors,
        };
      }
      // For other types of errors
      return {
        success: false,
        message: 'An error occurred while processing the form',
      };
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() formData: Form) {
    try {
      // Validate the incoming data against the schema
      const validatedData = formSchema.parse(formData);

      // Process the form data
      const result = await this.appService.update(id, validatedData);

      return {
        success: true,
        message: 'Data updated successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: 'Validation failed',
          errors: error.errors,
        };
      }
      return {
        success: false,
        message: 'An error occurred while updating the data',
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const result = await this.appService.delete(id);
      console.log(`data ${id} deleted`);
      return {
        success: true,
        message: 'Data deleted successfully',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while deleting the data',
        error: error.message,
      };
    }
  }
}
