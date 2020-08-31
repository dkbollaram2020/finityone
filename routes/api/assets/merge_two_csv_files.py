#!/usr/bin/env python
# coding: utf-8

# In[1]:


# import the pandas library
import pandas as pd


# In[2]:


# Read the csv files into two dataframes
contacts = pd.read_csv('contacts.csv')
trip_data = pd.read_csv('trip_data.csv')


# In[3]:


print(contacts)


# In[4]:


# Rename the id column in contacts csv file to match the contact_id column in trip_data csv file
contacts.rename(columns={'id':'contact_id'}, inplace=True)


# In[5]:


print(contacts)


# In[6]:


# Merge the two dataframes, using contact_id column as key
merged = pd.merge(contacts, trip_data, on = 'contact_id')
merged.set_index('contact_id', inplace = True)


# In[7]:


# Write it to a new CSV file
merged.to_csv('after_merge.csv')


# In[9]:


# Print the newly merged CSV file
print(merged)


# In[ ]:




